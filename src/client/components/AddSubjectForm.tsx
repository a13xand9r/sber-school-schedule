import { IconHouseSbol, IconPersone } from '@sberdevices/plasma-icons';
import { Button, TextField } from '@sberdevices/plasma-ui'
import React, { Dispatch, FC, FormEvent, useCallback, useEffect, useState } from 'react'
import { actions, ActionsType, SubjectConstType, SubjectWithIconsType } from '../../../store'
import style from '../../../styles/schedule.module.css'
import { SubjectSelectButtonMemo } from './SubjectsSelectButton'
import { SubjectListModeMemo } from './SubjectListMode'
import { createAssistant } from '@sberdevices/assistant-client';

export const AddSubjectForm: FC<PropsType> = ({ dispatch, finishAdding, assistant }) => {
  const [isSubjectListMode, setIsSubjectListMode] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<SubjectConstType | null>(null)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [subjectInput, setSubjectInput] = useState<string>('')
  const [teacherInput, setTeacherInput] = useState<string>('')
  const [cabinetInput, setCabinetInput] = useState<string>('')
  const [isError, setIsError] = useState(false)
  useEffect(() => {
    assistant.on('data', ({ smart_app_data }: any) => {
      if (smart_app_data) {
        if (smart_app_data.type === 'ADD_SUBJECT') setSubjectInput(smart_app_data.subject)
      }
    })
  }, [])
  useEffect(() => {
    if (isSubjectListMode){
      let subjInput = document.getElementById('subjInput')
      subjInput?.scrollIntoView({block: 'start', behavior: 'smooth'})
      // window.scroll(0, 160)
    } else window.scrollTo({top: 0, behavior: 'smooth'})
  }, [isSubjectListMode])
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedSubject && selectedIcon) {
      dispatch(actions.addSubject({
        cabinet: cabinetInput,
        teacher: teacherInput,
        subject: selectedSubject,
        icon: selectedIcon,
        id: Date.now().toString()
      }))
      finishAdding()
    } else setIsError(true)
  }
  const onSubjectClick = useCallback((subject: SubjectWithIconsType) => {
    setSubjectInput(subject.subject)
    setIsSubjectListMode(false)
    setSelectedSubject(subject.subject)
    setSelectedIcon(subject.icon)
    setIsError(false)
  }, [])
  const changeSubjectListMode = useCallback(() => {
    setIsSubjectListMode(prev => !prev)
  }, [])
  const changeSubjectInput = useCallback((str: string) => {
    setSelectedSubject(null)
    setSelectedIcon(null)
    setSubjectInput(str)
  }, [])
  return <>
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
          <Button text='Добавить' />
        </div>
      </form> :
      <SubjectListModeMemo onSubjectClick={onSubjectClick} query={subjectInput} />
    }
  </>
}

type PropsType = {
  dispatch: Dispatch<ActionsType>
  finishAdding: () => void
  assistant: ReturnType<typeof createAssistant>
}