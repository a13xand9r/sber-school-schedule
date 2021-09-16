import { createAssistant } from '@sberdevices/assistant-client'
import { Button, TabItem, Tabs } from '@sberdevices/plasma-ui'
import React, { Dispatch, FC, useCallback, useContext, useEffect, useState } from 'react'
import { CharacterContext } from '../../../pages'
import { actions, ActionsType, daysArray, DayType, ScheduleType, SubjectType } from '../../../store'
import style from '../../../styles/schedule.module.css'
import { AddSubjectForm } from './AddSubjectForm'
import { SubjectList } from './SubjectList'

export const Schedule: FC<PropsType> = ({ day, dispatch, isEditMode, saveData, schedule, userId, isAddSubjectMode, assistant, changingSubject }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const subjects = schedule[day]
  const {surface} = useContext(CharacterContext)
  useEffect(() => {
    dispatch(actions.setIsAddSubjectMode(false))
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
      dispatch(actions.finishChangingSubject())
      dispatch(actions.setIsAddSubjectMode(false))
    }
  }, [isEditMode])
  useEffect(() => {
    if (isAddSubjectMode)
      assistant.sendAction({type: 'CHANGE_ADD_SUBJECT_MODE', payload: {isAddSubjectMode, isChangingSubject: !!changingSubject}})
  }, [isAddSubjectMode, changingSubject])
  const deleteItem = useCallback((id: string) => {
    dispatch(actions.deleteSubject(id))
  }, [])

  const onSubjectClick = (id: string) => {
    dispatch(actions.startChangingSubject(id))
    dispatch(actions.setIsAddSubjectMode(true))
  }

  const finishAdding = useCallback(() => {
    dispatch(actions.finishChangingSubject())
    dispatch(actions.setIsAddSubjectMode(false))
  }, [])
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
            {tab[1]}
          </TabItem>
        ))}
      </Tabs>
    </div>
    {
      !isEditMode ?
        <>
          <SubjectList
            list={subjects}
            isEditMode={isEditMode}
            deleteItem={deleteItem}
          />
          {(!subjects || !subjects.length) && surface === 'mobile' &&
            <Button className={style.editButton}
              text='Редактировать расписание'
              view='secondary'
              onClick={setEditMode}
            />}
        </> :
        !isAddSubjectMode ?
          <>
            <SubjectList
              list={subjects}
              isEditMode={isEditMode}
              onClick={onSubjectClick}
              deleteItem={deleteItem}
            />
            <div>
              <Button className={style.editButton}
                text='Добавить предмет'
                view='secondary'
                onClick={() => dispatch(actions.setIsAddSubjectMode(true))}
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
            changingSubject={changingSubject}
            assistant={assistant}
            dispatch={dispatch}
            finishAdding={finishAdding}
          />
    }
  </div>
}

type PropsType = {
  day: DayType
  isEditMode: boolean
  changingSubject: SubjectType | null
  saveData: () => void
  schedule: ScheduleType
  dispatch: Dispatch<ActionsType>
  userId: string | null
  isAddSubjectMode: boolean
  assistant: ReturnType<typeof createAssistant>
}