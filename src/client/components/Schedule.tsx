import { Body1, Button, Button1, Button2, Footnote2, Spinner, TabItem, Tabs, Underline } from '@sberdevices/plasma-ui'
import React, { Dispatch, FC, useEffect, useState } from 'react'
import { actions, ActionsType, daysArray, DayType, ScheduleType, SubjectType, SurfaceType } from '../../../store'
import style from '../../../styles/schedule.module.css'
import { AddSubjectForm } from './AddSubjectForm'
import { SubjectList } from './SubjectList'

export const Schedule: FC<PropsType> = ({ day, dispatch, isEditMode, saveData, surface, schedule }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [isAddSubjectMode, setIsAddSubjectMode] = useState(false)
  const subjects = schedule[day]
  useEffect(() => {
    setIsAddSubjectMode(false)
  }, [day])
  useEffect(() => {
    return () => {
      dispatch(actions.setEditMode(false))
    }
  }, [])
  useEffect(() => {
    if (isEditMode) {
      setIsButtonDisabled(false)
    }
  }, [schedule])
  useEffect(() => {
    if (!isEditMode) {
      setIsButtonDisabled(true)
    }
  }, [isEditMode])
  const deleteItem = (index: number) => {
    dispatch(actions.deleteSubject(index))
  }
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
            className={style.tabItem}
            key={tab[0]}
            isActive={tab[0] === day}
            tabIndex={1}
            onClick={() => dispatch(actions.changeDay(tab[0]))}
          >
            {surface === 'sberbox' ? tab[0] : tab[1]}
          </TabItem>
        ))}
      </Tabs>
    </div>
    {
      !isEditMode ?
        <>
          <SubjectList list={subjects} isEditMode={isEditMode} deleteItem={deleteItem} />
          {(!subjects || !subjects.length) && <Button className={style.editButton}
            text='Редактировать расписание'
            view='secondary'
            onClick={() => dispatch(actions.setEditMode(true))}
          />}
        </> :
        !isAddSubjectMode ?
          <>
            <SubjectList list={subjects} isEditMode={isEditMode} deleteItem={deleteItem} />
            <div>
              <Button className={style.editButton}
                text='Добавить предмет'
                view='secondary'
                onClick={() => { setIsAddSubjectMode(true) }}
              />
            </div>
            <div className={style.submitChangeButtonContainer}>
              <Button
                className={style.submitChangeButton}
                disabled={isButtonDisabled}
                onClick={saveData}
                view='accent'
                text='Сохранить'
              />
            </div>
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
  surface: SurfaceType
  isEditMode: boolean
  saveData: () => void
  schedule: ScheduleType
  dispatch: Dispatch<ActionsType>
}