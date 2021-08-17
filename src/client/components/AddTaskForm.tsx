import { IconChevronDown } from '@sberdevices/plasma-icons'
import { Body1, Button, DatePicker, Headline3, TextArea } from '@sberdevices/plasma-ui'
import React, { Dispatch, FC, FormEvent, useState } from 'react'
import { actions, ActionsType, SubjectConstType, SubjectWithIconsType, SubSubjectConstType } from '../../../store'
import style from '../../../styles/schedule.module.css'
import { SubjectListMode } from './SubjectListMode'
import { SubjectSelectButton } from './SubjectsSelectButton'

export const AddTaskForm: FC<PropsType> = ({dispatch, finishAdding}) => {
  const [isSubjectListMode, setIsSubjectListMode] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<{subject: SubjectConstType, subSubject: SubSubjectConstType, icon: string} | null>(null)
  const [dateValue, setDateValue] = useState<Date>(() => new Date())
  const [taskText, setTaskText] = useState<string>('')
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedSubject && taskText) {
      dispatch(actions.addHomeTask({
        subject: selectedSubject.subject,
        icon: selectedSubject.icon,
        date: dateValue,
        task: taskText,
        subSubject: selectedSubject.subSubject
      }))
      finishAdding()
    }
  }
  const changeSubjectListMode = () => {
    setIsSubjectListMode(prev => !prev)
  }
  const onSubjectClick = (subject: SubjectWithIconsType | null) => {
    setIsSubjectListMode(false)
    setSelectedSubject(subject)
  }
  return <>
    <SubjectSelectButton
      changeSubjectListMode={changeSubjectListMode}
      selectedSubject={selectedSubject ? selectedSubject.subject : null}
    />
    {
      !isSubjectListMode ?
        <form className={style.form} onSubmit={onFormSubmit}>
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
            className={style.taskText}
            // helperText={text('helperText', 'Helper text')}
            // contentRight={boolean('contentRight', true) && <IconPlaceholder />}
            // status={'success'}
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
        <SubjectListMode onSubjectClick={onSubjectClick} />
    }
  </>
}

type PropsType = {
  dispatch: Dispatch<ActionsType>
  finishAdding: () => void
}