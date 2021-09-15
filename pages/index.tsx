import { IconEvent, IconHouse } from '@sberdevices/plasma-icons'
import { Container, Spinner, TabItem, Tabs } from '@sberdevices/plasma-ui'
import React, { useCallback, useEffect, useReducer, useRef } from 'react'
import { Schedule } from '../src/client/components/Schedule'
import { GlobalStyles } from '../GlobalStyle'
import { actions, DayType, initialState, reducer, ScheduleType, StateType, TabsType } from '../store'
import { createAssistant, createSmartappDebugger, AssistantAppState } from '@sberdevices/assistant-client'
import style from '../styles/index.module.css'
import { postSchedule, requestHomeTasks, requestSchedule } from '../src/client/apiRequests'
import { CustomHeader } from '../src/client/components/CustomHeader'
import { HomeTasks } from '../src/client/components/HomeTasks'

export const CharacterContext = React.createContext({character: 'sber', surface: 'mobile'})

const initializeAssistant = (getState: () => AssistantState) => {
  if (process.env.NODE_ENV === 'development') {
    return createSmartappDebugger({
      token: process.env.NEXT_PUBLIC_ASSISTANT_TOKEN ?? '',
      initPhrase: 'Запусти школьное расписание',
      getState
    })
  }
  return createAssistant({ getState })
}
const tabs = ['Расписание', 'Домашка'] as const

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const saveData = useCallback(() => {
    postSchedule(state.userId as string, state.schedule)
    // dispatch(actions.setSchedule(newSchedule))
    dispatch(actions.setEditMode(false))
  }, [state.userId, state.schedule])

  const assistantRef = useRef<ReturnType<typeof createAssistant>>()
  const assistantStateRef = useRef<AssistantState>({} as AssistantState)
  useEffect(() => {
    assistantRef.current = initializeAssistant(() => {
      console.log('assistantState', assistantStateRef.current)
      return assistantStateRef.current
    })
    assistantRef.current.on('data', ({ smart_app_data, type, character }: any) => {
      if (smart_app_data) {
        dispatch(smart_app_data)
        if (smart_app_data.type === 'SAVE_SCHEDULE') saveData()
      }
      if (type === 'character') dispatch(actions.setCharacter(character.id))
    })
    const detectDeviceCallback = () => (
      window.navigator.userAgent.toLowerCase().includes('sberbox') ? 'sberbox' : 'mobile'
    )
    dispatch(actions.setSurface(detectDeviceCallback()))
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
      dispatch(actions.setIsFetching(false))
    }
    if (state.userId) {
      initialRequests()
    }
  }, [state.userId])
  useEffect(() => {
    assistantStateRef.current = {
      isEditMode: state.isEditMode,
      tabPage: state.tabPage,
      day: state.day,
      schedule: state.schedule
    }
  }, [state])
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
    <CharacterContext.Provider value={{character: state.character, surface: state.surface}}>
      <GlobalStyles character={state.character} />
      <Container>
        <CustomHeader
          isFetching={state.isFetching}
          homeTask={state.showTaskMode}
          setEditMode={setEditMode}
          isEditMode={state.isEditMode}
          tab={state.tabPage}
          setIsAddTaskMode={(flag: boolean) => dispatch(actions.setIsAddTaskMode(flag))}
          isAddTaskMode={state.isAddTaskMode}
          setShowTaskMode={(index: number | null) => dispatch(actions.setShowTaskMode(index))}
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
                  tab === 'Расписание' ?
                    <IconEvent className={style.icon} /> :
                    <IconHouse className={style.icon} />
                }
              >
                {tab}
              </TabItem>
            ))}
          </Tabs>
          {
            state.isFetching ? <div className={style.spinner}><Spinner /></div> :
              selectTab()
          }
        </div>
      </Container>
    </CharacterContext.Provider>
  )
}

export interface AssistantState extends AssistantAppState {
  isEditMode: boolean
  tabPage: TabsType
  day: DayType
  schedule: ScheduleType
}
