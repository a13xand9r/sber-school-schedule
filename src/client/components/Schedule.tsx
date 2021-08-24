import { Button, TabItem, Tabs } from '@sberdevices/plasma-ui'
import React, { Dispatch, FC, useCallback, useEffect, useState } from 'react'
import { actions, ActionsType, daysArray, DayType, ScheduleType, SurfaceType } from '../../../store'
import style from '../../../styles/schedule.module.css'
import { AddSubjectForm } from './AddSubjectForm'
import { SubjectList } from './SubjectList'

export const Schedule: FC<PropsType> = ({ day, dispatch, isEditMode, saveData, surface, schedule, userId }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [isAddSubjectMode, setIsAddSubjectMode] = useState(false)
  const subjects = schedule[day]
  useEffect(() => {
    setIsAddSubjectMode(false)
  }, [day])
  useEffect(() => {
    !isEditMode && setIsAddSubjectMode(false)
  }, [isEditMode])
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
  const deleteItem = useCallback((id: string) => {
    dispatch(actions.deleteSubject(id))
  }, [])
  const finishAdding = useCallback(() => setIsAddSubjectMode(false), [])
  const setEditMode = useCallback(() => dispatch(actions.setEditMode(true)), [])
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
            onClick={setEditMode}
          />}
        </> :
        !isAddSubjectMode ?
          <>
            <SubjectList list={subjects} isEditMode={isEditMode} deleteItem={deleteItem} />
            <div>
              <Button className={style.editButton}
                text='Добавить предмет'
                view='secondary'
                onClick={() => setIsAddSubjectMode(true)}
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
            finishAdding={finishAdding}
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
  userId: string | null
}