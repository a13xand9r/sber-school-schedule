import { IconEvent, IconHouse } from '@sberdevices/plasma-icons'
import { Container, Spinner, TabItem, Tabs } from '@sberdevices/plasma-ui'
import React, { useCallback, useEffect, useReducer, useRef } from 'react'
import { Schedule } from '../src/client/components/Schedule'
import { GlobalStyles } from '../GlobalStyle'
import { actions, initialState, reducer } from '../store'
import { createAssistant } from '@sberdevices/assistant-client'
import style from '../styles/index.module.css'
import { postSchedule, requestHomeTasks, requestSchedule } from '../src/client/apiRequests'
import { CustomHeader } from '../src/client/components/CustomHeader'
import { HomeTasks } from '../src/client/components/HomeTasks'
import { initAssistant, initializeAssistant } from '../src/client/assistant'
import { AssistantState, StateType } from '../src/types'
import { CharacterContext } from '../src/client/context'
import { Loader } from '../src/client/components/Loader'
import { CSSTransition } from 'react-transition-group'

if (process.browser){
  //@ts-ignore
  import('@sberdevices/spatial-navigation')
}

const tabs = ['Расписание', 'Домашка'] as const

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const stateRef = useRef<StateType>(state)
  stateRef.current = state
  const saveData = useCallback(async () => {
    dispatch(actions.setIsFetching(true))
    try {
      await postSchedule(stateRef.current.userId as string, stateRef.current.schedule)
    } catch (e) {
      alert('Какие-то неполадки. Попробуйте попозже.')
    }
    dispatch(actions.setIsFetching(false))
    dispatch(actions.setEditMode(false))
  }, [stateRef.current.userId, stateRef.current.schedule])

  const assistantRef = useRef<ReturnType<typeof createAssistant>>()
  const assistantStateRef = useRef<AssistantState>({} as AssistantState)
  assistantStateRef.current = {
    isEditMode: state.isEditMode,
    tabPage: state.tabPage,
    day: state.day,
    schedule: state.schedule,
    isAddTaskMode: state.isAddTaskMode,
    isAddSubjectMode: state.isAddSubjectMode,
    showTaskMode: state.showTaskMode
  }
  useEffect(() => {
    assistantRef.current = initializeAssistant(() => assistantStateRef.current)
    initAssistant(dispatch, assistantRef.current as ReturnType<typeof createAssistant>, assistantStateRef.current, saveData)
  }, [])
  useEffect(() => {
    const getSchedule = async () => {
      const newSchedule = await requestSchedule(state.userId as string)
      dispatch(actions.setSchedule(newSchedule))
    }
    const getHomeTasks = async () => {
      const requestedHomeTasks = await requestHomeTasks(state.userId as string)
      dispatch(actions.setHomeTasks(requestedHomeTasks))
    }
    const initialRequests = async () => {
      await Promise.all([
        getHomeTasks(),
        getSchedule()
      ])
      dispatch(actions.setIsInitialFetching(false))
    }
    if (state.userId) {
      initialRequests()
    }
  }, [state.userId])

  useEffect(() => {
    assistantRef.current?.sendAction({ type: 'CHANGE_TAB_PAGE', payload: { tabPage: state.tabPage } })
  }, [state.tabPage])
  useEffect(() => {
    assistantRef.current?.sendAction({ type: 'CHANGE_IS_EDIT_MODE', payload: { isEditMode: state.isEditMode } })
  }, [state.isEditMode])

  const selectTab = () => {
    switch (state.tabPage) {
      case 'Расписание':
        return <Schedule
          //@ts-ignore
          assistant={assistantRef.current}
          isAddSubjectMode={state.isAddSubjectMode}
          saveData={saveData}
          isEditMode={state.isEditMode}
          day={state.day}
          dispatch={dispatch}
          schedule={state.schedule}
          userId={state.userId}
          changingSubject={state.changingSubject}
        />
      case 'Домашка': return <HomeTasks
        userId={state.userId}
        isAddTaskMode={state.isAddTaskMode}
        homeTasks={state.homeTasks}
        showTaskMode={state.showTaskMode}
        dispatch={dispatch}
        //@ts-ignore
        assistant={assistantRef.current}
      />
    }
  }
  const setEditMode = (flag: boolean) => {
    dispatch(actions.setEditMode(flag))
    if (!flag) dispatch(actions.resetScheduleCopy())
  }
  return (
    <CharacterContext.Provider value={{ character: state.character, surface: state.surface }}>
      <GlobalStyles character={state.character} />
      <Container>
        <CustomHeader
          isFetching={state.isStartFetching}
          homeTask={state.showTaskMode}
          setEditMode={setEditMode}
          isEditMode={state.isEditMode}
          tab={state.tabPage}
          isAddSubjectMode={state.isAddSubjectMode}
          setIsAddSubjectMode={(flag: boolean) => dispatch(actions.setIsAddSubjectMode(flag))}
          setIsAddTaskMode={(flag: boolean) => dispatch(actions.setIsAddTaskMode(flag))}
          isAddTaskMode={state.isAddTaskMode}
          setShowTaskMode={(id: string | null) => dispatch(actions.setShowTaskMode(id))}
        />
        <div className={style.appContainer}>
          <Tabs
            size={'m'}
            view={'secondary'}
            stretch={true}
            pilled={true}
            scaleOnPress={true}
            outlined={true}
            disabled={false}
          >
            {tabs.map(tab => (
              <TabItem
                key={tab}
                isActive={tab === state.tabPage}
                tabIndex={1}
                onClick={() => dispatch(actions.changeTab(tab))}
                contentLeft={
                  state.userId && (
                    tab === 'Расписание' ?
                      <IconEvent className={style.icon} /> :
                      <IconHouse className={style.icon} />
                  )
                }
              >
                {tab}
              </TabItem>
            ))}
          </Tabs>
          {
            state.isStartFetching ? <div className={style.spinner}><Spinner /></div> :
              selectTab()
          }
          {
            <CSSTransition
              in={state.isFetching}
              timeout={200}
              classNames='loader'
              unmountOnExit
            >
              <Loader />
            </CSSTransition>

          }
        </div>
      </Container>
    </CharacterContext.Provider>
  )
}
