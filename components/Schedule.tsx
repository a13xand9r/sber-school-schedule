import { Body1, Button, Spinner, TabItem, Tabs } from '@sberdevices/plasma-ui'
import React, { Dispatch, FC, useEffect, useState } from 'react'
import { actions, ActionsType, DayType, SubjectType } from '../store'
import style from '../styles/schedule.module.css'
import { AddSubjectForm } from './AddSubjectForm'
import { SubjectList } from './SubjectList'

const daysArray = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'] as const

export const Schedule: FC<PropsType> = ({ day, subjects, userId, dispatch, isEditMode, saveData }) => {
  const [isAddSubjectMode, setIsAddSubjectMode] = useState(false)
  useEffect(() => {
    setIsAddSubjectMode(false)
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
    {!userId ? <div className={style.spinner}><Spinner /></div> :
      !isEditMode ? <SubjectList list={subjects} /> :
        !isAddSubjectMode ?
          <>
            <SubjectList list={subjects} />
            <div>
              <Button className={style.editButton}
                text='Добавить предмет'
                view='secondary'
                onClick={() => { setIsAddSubjectMode(true) }}
              />
            </div>
            <Button
            className={style.subjectFormButton}
            onClick={saveData}
            view='accent'
            text={<Body1>Сохранить</Body1>}
          />
          </> :
          <AddSubjectForm
            dispatch={dispatch}
            finishAdding={() => setIsAddSubjectMode(false)}
          />
    }
  </div>
}

type PropsType = {
  day: DayType
  userId: string | null
  subjects: SubjectType[] | null
  isEditMode: boolean
  saveData: () => void
  dispatch: Dispatch<ActionsType>
}