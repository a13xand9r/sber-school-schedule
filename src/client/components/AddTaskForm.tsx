import { createAssistant } from '@sberdevices/assistant-client'
import { Body1, Button, DatePicker, TextArea } from '@sberdevices/plasma-ui'
import React, { Dispatch, FC, FormEvent, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { actions } from '../../../store'
import style from '../../../styles/schedule.module.css'
import { ActionsType, SubjectConstType, SubjectWithIconsType, SubSubjectConstType } from '../../types'
import { allSubjects } from '../../utils/constants'
import { changeHomeTasks } from '../apiRequests'
import { CharacterContext } from '../context'
import { SubjectListModeMemo } from './SubjectListMode'
import { SubjectSelectButtonMemo } from './SubjectsSelectButton'

export const AddTaskForm: FC<PropsType> = ({ dispatch, finishAdding, userId, assistant }) => {
  const [isSubjectListMode, setIsSubjectListMode] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<{ subject: SubjectConstType, subSubject: SubSubjectConstType, icon: string } | null>(null)
  const [dateValue, setDateValue] = useState<Date>(new Date())
  const [subjectInput, setSubjectInput] = useState<string>('')
  const [taskText, setTaskText] = useState<string>('')
  const [isError, setIsError] = useState(false)
  const [isShowDatePicker, setIsShowDatePicker] = useState(true)
  const changeSubjectInput = useCallback((str: string) => {
    setSelectedSubject(null)
    setSubjectInput(str)
  }, [])
  const { character } = useContext(CharacterContext)
  const taskRef = useRef<any>()
  taskRef.current = {
    userId,
    taskText,
    selectedSubject,
    dateValue
  }
  const onFormSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    if (taskRef.current?.selectedSubject && taskRef.current?.taskText && taskRef.current?.userId) {
      const newHomeTask = {
        subject: taskRef.current.selectedSubject.subject,
        icon: taskRef.current.selectedSubject.icon,
        date: taskRef.current.dateValue,
        task: taskRef.current.taskText,
        subSubject: taskRef.current.selectedSubject.subSubject,
        id: Date.now().toString()
      }
      dispatch(actions.setIsFetching(true))
      try{
        await changeHomeTasks(taskRef.current.userId, newHomeTask)
      } catch(e){
        alert('Какие-то неполадки. Попробуйте попозже.')
      }
      dispatch(actions.setIsFetching(false))
      dispatch(actions.addHomeTask(newHomeTask))
      finishAdding()
    } else setIsError(true)
  }

  useEffect(() => {
    assistant.on('data', ({ smart_app_data }: any) => {
      if (smart_app_data) {
        console.log(smart_app_data)
        if (smart_app_data.type === 'ADD_SUBJECT_FORM') {
          setSubjectInput(smart_app_data.subject)
          setSelectedSubject(allSubjects.filter(item => item.subject === smart_app_data.subject)[0])
        }
        if (smart_app_data.type === 'SET_HOME_TASK_TEXT_FORM') setTaskText(smart_app_data.text)
        if (smart_app_data.type === 'SAVE_HOME_TASK_FROM') onFormSubmit()
        if (smart_app_data.type === 'SET_DATE_FORM') {
          setIsShowDatePicker(false)
          setDateValue(new Date(smart_app_data.timestamp))
          setIsShowDatePicker(true)
        }
      }
    })
    return () => {
      const unsubscribe = assistant.sendAction({type: 'unsubscribe', payload: {}})
      unsubscribe()
      taskRef.current = null
    }
  }, [])
  const getDatePicker = () => (
    <DatePicker
      className={style.datePicker}
      value={dateValue}
      min={new Date()}
      max={new Date('2035-01-26')}
      size={'s'}
      visibleItems={3}
      scrollSnapType={'mandatory'}
      disabled={false}
      autofocus={true}
      onChange={v => setDateValue(v)}
    />
  )
  useEffect(() => {
    if (isSubjectListMode){
      let subjInput = document.getElementById('subjInput')
      subjInput?.scrollIntoView({block: 'start', behavior: 'smooth'})
      // window.scroll(0, 160)
    } else window.scrollTo({top: 0, behavior: 'smooth'})
  }, [isSubjectListMode])

  const changeSubjectListMode = useCallback((flag?: boolean) => {
    if (flag !== undefined) setIsSubjectListMode(flag)
    else setIsSubjectListMode(prev => !prev)
  }, [])

  const onSubjectClick = useCallback((subject: SubjectWithIconsType) => {
    setSubjectInput(subject.subject)
    setIsSubjectListMode(false)
    setSelectedSubject(subject)
    setIsError(false)
  }, [])

  return <div>
    <SubjectSelectButtonMemo
      changeSubjectListMode={changeSubjectListMode}
      isError={isError && !selectedSubject}
      isSubjectListMode={isSubjectListMode}
      setSubjectInput={changeSubjectInput}
      subjectInput={subjectInput}
    />
    {
      !isSubjectListMode ?
        <form className={style.form} onSubmit={onFormSubmit}>
          <Body1 className={style.label}>Дата сдачи:</Body1>
          {isShowDatePicker && getDatePicker()}
          <Body1 className={style.label}>Задание:</Body1>
          <TextArea
            value={taskText}
            placeholder={character === 'joy' ? 'Введи задание' : 'Введите задание'}
            className={`${style.taskText} ${isError && !!selectedSubject && style.taskTextError}`}
            resize='vertical'
            disabled={false}
            readOnly={false}
            wrap="soft"
            onChange={(e) => {
              setTaskText(e.target.value)
              setIsError(false)
            }}
          />
          <div className={style.addButton}>
            <Button type='submit' text='Добавить' />
          </div>
        </form> :
        <SubjectListModeMemo onSubjectClick={onSubjectClick} query={subjectInput} />
    }
  </div>
}

type PropsType = {
  dispatch: Dispatch<ActionsType>
  finishAdding: () => void
  userId: string | null
  assistant: ReturnType<typeof createAssistant>
}