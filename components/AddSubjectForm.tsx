import { IconChevronDown, IconHouseSbol, IconPersone, IconSleep } from '@sberdevices/plasma-icons';
import { Body1, Button, TextField } from '@sberdevices/plasma-ui'
import React, { Dispatch, FC, FormEvent, useState } from 'react'
import { actions, ActionsType, allSubjects, SubjectConstType, SubjectType } from '../store'
import Image from 'next/image'
import style from '../styles/schedule.module.css'

export const AddSubjectForm: FC<PropsType> = ({ dispatch, finishAdding }) => {
  const [isSubjectListMode, setIsSubjectListMode] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<SubjectConstType | null>(null)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [teacherInput, setTeacherInput] = useState<string>('')
  const [cabinetInput, setCabinetInput] = useState<string>('')
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedSubject && selectedIcon) {
      dispatch(actions.addSubject({
        cabinet: cabinetInput,
        teacher: teacherInput,
        subject: selectedSubject,
        icon: selectedIcon
      }))
    }
    finishAdding()
  }
  const onSubjectClick = (subject: SubjectWithIconsType) => {
    setIsSubjectListMode(false)
    setSelectedSubject(subject.subject)
    setSelectedIcon(subject.icon)
  }
  return <>
    {!isSubjectListMode ?
      <form onSubmit={(e) => onFormSubmit(e)}>
        <Button
          className={style.subjectFormButton}
          onClick={() => setIsSubjectListMode(true)}
          view='secondary'
          contentRight={<IconChevronDown />}
          text={<Body1>{selectedSubject ? selectedSubject : 'Предмет'}</Body1>}
        />
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
        <Button text='Добавить' />
      </form> :
      <div className={style.subjectsSelect}>
        {allSubjects.map(subj => (
          <Button
            size='s'
            className={style.subjectButton}
            key={subj.subject}
            view='secondary'
            onClick={() => onSubjectClick(subj)}
          >
            <>
            <Image  src={subj.icon} alt='' layout='fixed' width={25} height={25} />
            <Body1 className={style.subjectText}>{subj.subject}</Body1>
            </>
          </Button>
        ))}
      </div>
    }
  </>
}

type PropsType = {
  dispatch: Dispatch<ActionsType>
  finishAdding: () => void
}
type SubjectWithIconsType = {
  subject: SubjectConstType
  icon: string
}