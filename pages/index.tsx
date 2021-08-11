import { IconEvent, IconHouse } from '@sberdevices/plasma-icons'
import { Container, TabItem, Tabs } from '@sberdevices/plasma-ui'
import React, { useReducer } from 'react'
import { Schedule } from '../components/Schedule'
import { GlobalStyles } from '../GlobalStyle'
import { actions, initialState, reducer } from '../store'
import style from '../styles/index.module.css'

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const tabs = ['Расписание', 'Домашка'] as const
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
