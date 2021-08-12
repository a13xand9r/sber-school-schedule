import { Button, TabItem, Tabs } from '@sberdevices/plasma-ui'
import React, { Dispatch, FC, useEffect, useState } from 'react'
import { actions, ActionsType, DayType, SubjectType } from '../store'
import style from '../styles/schedule.module.css'
import { AddSubjectForm } from './AddSubjectForm'
import { SubjectList } from './SubjectList'

const daysArray = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'] as const

export const Schedule: FC<PropsType> = ({ day, subjects, dispatch }) => {
  const [isEditMode, setIsEditMode] = useState(false)
  useEffect(() => {
    setIsEditMode(false)
  }, [day])
  return <div className={style.schedule}>
    <div className={style.dayTabs}>
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
    </div>
    {!isEditMode ?
      <>
        <SubjectList list={subjects} />
        <Button className={style.editButton}
          text='Добавить предмет'
          view='secondary'
          onClick={() => { setIsEditMode(true) }}
        />
      </> :
      <AddSubjectForm
        dispatch={dispatch}
        finishAdding={() => setIsEditMode(false)}
      />
    }
  </div>
}

type PropsType = {
  day: DayType
  subjects: SubjectType[] | null
  dispatch: Dispatch<ActionsType>
}