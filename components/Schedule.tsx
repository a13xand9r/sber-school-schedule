import { TabItem, Tabs } from '@sberdevices/plasma-ui'
import React, { Dispatch, FC } from 'react'
import { actions, ActionsType, DayType, SubjectType } from '../store'
import style from '../styles/schedule.module.css'
import { SubjectList } from './SubjectList'

const daysArray = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'] as const

export const Schedule: FC<PropsType> = ({ day, subjects, dispatch }) => {

  return <div className={style.schedule}>
    <Tabs
      size={'s'}
      view={'clear'}
      stretch={false}
      pilled={true}
      scaleOnPress={true}
      outlined={true}
      disabled={false}
    >
      {daysArray.map(tab => (
        <TabItem
          key={tab}
          isActive={tab === day}
          tabIndex={1}
          onClick={() => dispatch(actions.changeDay(tab))}
        >
          {tab}
        </TabItem>
      ))}
    </Tabs>

    <SubjectList list={subjects}/>
  </div>
}

type PropsType = {
  day: DayType
  subjects: SubjectType[] | null
  dispatch: Dispatch<ActionsType>
}