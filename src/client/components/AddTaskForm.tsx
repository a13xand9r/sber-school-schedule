import { IconChevronDown, IconChevronUp } from '@sberdevices/plasma-icons'
import { Body1, Button, DatePicker, Headline3, TextArea, TextField } from '@sberdevices/plasma-ui'
import React, { Dispatch, FC, FormEvent, useState } from 'react'
import { actions, ActionsType, SubjectConstType, SubjectWithIconsType, SubSubjectConstType } from '../../../store'
import style from '../../../styles/schedule.module.css'
import { changeHomeTasks } from '../apiRequests'
import { SubjectListMode } from './SubjectListMode'
import { SubjectSelectButton } from './SubjectsSelectButton'

export const AddTaskForm: FC<PropsType> = ({ dispatch, finishAdding, userId }) => {
  const [isSubjectListMode, setIsSubjectListMode] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<{ subject: SubjectConstType, subSubject: SubSubjectConstType, icon: string } | null>(null)
  const [dateValue, setDateValue] = useState<Date>(() => new Date())
  const [subjectInput, setSubjectInput] = useState<string>('')
  const [taskText, setTaskText] = useState<string>('')
  const [isError, setIsError] = useState(false)
  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedSubject && taskText && userId) {
      console.log(dateValue)
      const newHomeTask = {
        subject: selectedSubject.subject,
        icon: selectedSubject.icon,
        date: dateValue,
        task: taskText,
        subSubject: selectedSubject.subSubject
      }
      changeHomeTasks(userId, newHomeTask)
      dispatch(actions.addHomeTask(newHomeTask))
      finishAdding()
    } else setIsError(true)
  }
  const changeSubjectListMode = () => {
    setIsSubjectListMode(prev => !prev)
  }
  const onSubjectClick = (subject: SubjectWithIconsType | null) => {
    setIsSubjectListMode(false)
    setSelectedSubject(subject)
    setIsError(false)
  }
  return <>
    {
      !isSubjectListMode ?
        <form className={style.form} onSubmit={onFormSubmit}>
          <SubjectSelectButton
            changeSubjectListMode={changeSubjectListMode}
            selectedSubject={selectedSubject ? selectedSubject.subject : null}
            isError={isError && !selectedSubject}
          />
          <Body1 className={style.label}>Дата сдачи:</Body1>
          <DatePicker
            className={style.datePicker}
            value={dateValue}
            min={new Date()}
            max={new Date('2035-01-26')}
            size={'s'}
            visibleItems={3}
            scrollSnapType={'mandatory'}
            // options={options}
            disabled={false}
            controls={true}
            autofocus={true}
            onChange={v => setDateValue(v)}
          />
          <Body1 className={style.label}>Задание:</Body1>
          <TextArea
            value={taskText}
            placeholder={'Введите задание'}
            className={`${style.taskText} ${isError && !taskText && !!selectedSubject && style.taskTextError}`}
            resize={'horizontal'}
            disabled={false}
            readOnly={false}
            onChange={(e) => {
              setTaskText(e.target.value)
            }}
          />
          <div className={style.addButton}>
            <Button text='Добавить' />
          </div>
        </form> :
        <>
          <TextField
            className={style.subjectInput}
            value={subjectInput}
            label={'Предмет'}
            contentLeft={
              <Button
                onClick={changeSubjectListMode}
                view='clear'
                size='s'
                style={{ padding: '0', color: '#808080' }}>
                <IconChevronUp color="inherit" size="s" />
              </Button>
            }
            placeholder='Предмет'
            disabled={false}
            onChange={t => setSubjectInput(t.target.value)}
          />
          <SubjectListMode onSubjectClick={onSubjectClick} query={subjectInput} />
        </>
    }
  </>
}

type PropsType = {
  dispatch: Dispatch<ActionsType>
  finishAdding: () => void
  userId: string | null
}