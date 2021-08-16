import { Body1, Button, Button1, Button2, Footnote2, Spinner, TabItem, Tabs, Underline } from '@sberdevices/plasma-ui'
import React, { Dispatch, FC, useEffect, useState } from 'react'
import { actions, ActionsType, DayType, SubjectType, SurfaceType } from '../store'
import style from '../styles/schedule.module.css'
import { AddSubjectForm } from './AddSubjectForm'
import { SubjectList } from './SubjectList'

// const daysArray = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'] as const
const daysArray = [
  ['Понедельник', 'Пн'],
  ['Вторник', 'Вт'],
  ['Среда', 'Ср'],
  ['Четверг', 'Чт'],
  ['Пятница', 'Пт'],
  ['Суббота', 'Сб'],
] as const

export const Schedule: FC<PropsType> = ({ day, subjects, isFetching, dispatch, isEditMode, saveData, surface }) => {
  const [isAddSubjectMode, setIsAddSubjectMode] = useState(false)
  useEffect(() => {
    setIsAddSubjectMode(false)
  }, [day])
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
    {isFetching ? <div className={style.spinner}><Spinner /></div> :
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
                onClick={saveData}
                view='accent'
                text={<Body1>Сохранить</Body1>}
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
  isFetching: boolean
  subjects: SubjectType[] | null
  isEditMode: boolean
  saveData: () => void
  dispatch: Dispatch<ActionsType>
}