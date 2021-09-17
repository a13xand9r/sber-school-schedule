import { IconHouseSbol, IconPersone } from '@sberdevices/plasma-icons';
import { Button, TextField } from '@sberdevices/plasma-ui'
import React, { Dispatch, FC, FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { actions } from '../../../store'
import style from '../../../styles/schedule.module.css'
import { SubjectSelectButtonMemo } from './SubjectsSelectButton'
import { SubjectListModeMemo } from './SubjectListMode'
import { createAssistant } from '@sberdevices/assistant-client';
import { ActionsType, SubjectConstType, SubjectType, SubjectWithIconsType } from '../../types';
import { allSubjects } from '../../utils/constants';

export const AddSubjectForm: FC<PropsType> = ({ dispatch, finishAdding, assistant, changingSubject }) => {
  const [isSubjectListMode, setIsSubjectListMode] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<SubjectConstType | null>(null)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [subjectInput, setSubjectInput] = useState<string>('')
  const [teacherInput, setTeacherInput] = useState<string>('')
  const [cabinetInput, setCabinetInput] = useState<string>('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (changingSubject){
      setSelectedSubject(changingSubject.subject)
      setSubjectInput(changingSubject.subject)
      setTeacherInput(changingSubject.teacher ?? '')
      setCabinetInput(changingSubject.cabinet ?? '')
      setSelectedIcon(changingSubject.icon ?? '')
    }
  }, [changingSubject])


  const changingSubjectRef = useRef<any>()
  changingSubjectRef.current = changingSubject
  const formDataRef = useRef<any>()
  formDataRef.current = {
    cabinetInput,
    teacherInput,
    selectedSubject,
    selectedIcon
  }
  const onFormSubmit = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    console.log(selectedSubject)
    console.log(selectedIcon)
    console.log(formDataRef.current.selectedSubject)
    console.log(formDataRef.current.selectedIcon)
    if (formDataRef.current.selectedSubject && formDataRef.current.selectedIcon) {
      if (!changingSubjectRef.current) {
        dispatch(actions.addSubject({
          cabinet: formDataRef.current.cabinetInput,
          teacher: formDataRef.current.teacherInput,
          subject: formDataRef.current.selectedSubject,
          icon: formDataRef.current.selectedIcon,
          id: Date.now().toString()
        }))
      } else{
        dispatch(actions.changeSubject({
          cabinet: formDataRef.current.cabinetInput,
          teacher: formDataRef.current.teacherInput,
          subject: formDataRef.current.selectedSubject,
          icon: formDataRef.current.selectedIcon,
          id: changingSubjectRef.current.id
        }))
      }
      finishAdding()
    } else setIsError(true)
  }

  useEffect(() => {
    assistant.on('data', ({ smart_app_data }: any) => {
      if (smart_app_data) {
        if (smart_app_data.type === 'ADD_SUBJECT_FORM') {
          setSubjectInput(smart_app_data.subject)
          setSelectedSubject(smart_app_data.subject)
          setSelectedIcon(allSubjects.filter(item => item.subject === smart_app_data.subject)[0].icon)
        }
        if (smart_app_data.type === 'FINISH_ADDING') onFormSubmit()
      }
    })
  }, [])
  useEffect(() => {
    if (isSubjectListMode){
      let subjInput = document.getElementById('subjInput')
      subjInput?.scrollIntoView({block: 'start', behavior: 'smooth'})
    } else window.scrollTo({top: 0, behavior: 'smooth'})
  }, [isSubjectListMode])

  const onSubjectClick = useCallback((subject: SubjectWithIconsType) => {
    setSubjectInput(subject.subject)
    setIsSubjectListMode(false)
    setSelectedSubject(subject.subject)
    setSelectedIcon(subject.icon)
    setIsError(false)
  }, [])
  const changeSubjectListMode = useCallback((flag?: boolean) => {
    if (flag !== undefined) setIsSubjectListMode(flag)
    else setIsSubjectListMode(prev => !prev)
  }, [])
  const changeSubjectInput = useCallback((str: string) => {
    setSelectedSubject(null)
    setSelectedIcon(null)
    setSubjectInput(str)
  }, [])
  return <div>
    <SubjectSelectButtonMemo
      changeSubjectListMode={changeSubjectListMode}
      isError={isError}
      isSubjectListMode={isSubjectListMode}
      setSubjectInput={changeSubjectInput}
      subjectInput={subjectInput}
    />
    {!isSubjectListMode ?
      <form className={style.form} onSubmit={(e) => onFormSubmit(e)}>
        <TextField
          className={style.teacherInput}
          value={teacherInput}
          label={'Учитель'}
          placeholder='Введите имя учителя'
          disabled={false}
          contentLeft={<IconPersone color="inherit" size="s" />}
          onChange={t => setTeacherInput(t.target.value)}
        />
        <TextField
          className={style.cabinetInput}
          value={cabinetInput}
          label={'Кабинет'}
          disabled={false}
          contentLeft={<IconHouseSbol color="inherit" size="s" />}
          onChange={c => setCabinetInput(c.target.value)}
        />
        <div className={style.addButton}>
          <Button text={changingSubject ? 'Изменить' : 'Добавить'} />
        </div>
      </form> :
      <SubjectListModeMemo onSubjectClick={onSubjectClick} query={subjectInput} />
    }
  </div>
}

type PropsType = {
  dispatch: Dispatch<ActionsType>
  finishAdding: () => void
  changingSubject: SubjectType | null
  assistant: ReturnType<typeof createAssistant>
}