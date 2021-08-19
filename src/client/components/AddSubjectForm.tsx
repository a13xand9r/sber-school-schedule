import { IconChevronDown, IconHouseSbol, IconPersone, IconSleep } from '@sberdevices/plasma-icons';
import { Body1, Button, TextField } from '@sberdevices/plasma-ui'
import React, { Dispatch, FC, FormEvent, useState } from 'react'
import { actions, ActionsType, allSubjects, SubjectConstType, SubjectType, SubjectWithIconsType } from '../../../store'
import Image from 'next/image'
import style from '../../../styles/schedule.module.css'
import { SubjectSelectButton } from './SubjectsSelectButton';
import { SubjectListMode } from './SubjectListMode';

export const AddSubjectForm: FC<PropsType> = ({ dispatch, finishAdding }) => {
  const [isSubjectListMode, setIsSubjectListMode] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<SubjectConstType | null>(null)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [teacherInput, setTeacherInput] = useState<string>('')
  const [cabinetInput, setCabinetInput] = useState<string>('')
  const [isError, setIsError] = useState(false)
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedSubject && selectedIcon) {
      dispatch(actions.addSubject({
        cabinet: cabinetInput,
        teacher: teacherInput,
        subject: selectedSubject,
        icon: selectedIcon
      }))
      finishAdding()
    } else setIsError(true)
  }
  const onSubjectClick = (subject: SubjectWithIconsType) => {
    setIsSubjectListMode(false)
    setSelectedSubject(subject.subject)
    setSelectedIcon(subject.icon)
    setIsError(false)
  }
  const changeSubjectListMode = () => {
    setIsSubjectListMode(prev => !prev)
  }
  return <>
    <SubjectSelectButton
      changeSubjectListMode={changeSubjectListMode}
      selectedSubject={selectedSubject}
      isError={isError}
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
      <SubjectListMode onSubjectClick={onSubjectClick} />
    }
  </>
}

type PropsType = {
  dispatch: Dispatch<ActionsType>
  finishAdding: () => void
}