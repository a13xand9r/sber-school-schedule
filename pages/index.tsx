import { IconEvent, IconHouse } from '@sberdevices/plasma-icons'
import { Container, TabItem, Tabs } from '@sberdevices/plasma-ui'
import React, { useEffect, useReducer, useRef } from 'react'
import { Schedule } from '../components/Schedule'
import { GlobalStyles } from '../GlobalStyle'
import { actions, initialState, reducer, StateType } from '../store'
import { createAssistant, createSmartappDebugger } from '@sberdevices/assistant-client'
import style from '../styles/index.module.css'

const initializeAssistant = (getState: () => StateType) => {
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
  const assistantRef = useRef<ReturnType<typeof createAssistant>>()
  useEffect(() => {
    assistantRef.current = initializeAssistant(() => state)
    assistantRef.current.on('data', ({ action }: any) => {
      if (action) dispatch(action)
    })
  }, [])
  const selectTab = () => {
    switch(state.tabPage){
      case 'Расписание': return <Schedule day={state.day} dispatch={dispatch} subjects={state.schedule[state.day]} />
      case 'Домашка': return <></>
    }
  }
  return (
    <>
      <GlobalStyles character={'sber'} />
      <Container>
        <Tabs
          size={'l'}
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
            >
              <div className={style.tabContent}>
                {
                  tab === 'Расписание' ?
                  <IconEvent className={style.icon} /> :
                  <IconHouse className={style.icon} />
                }
                {tab}
              </div>
            </TabItem>
          ))}
        </Tabs>
        {selectTab()}
      </Container>
    </>
  )
}
