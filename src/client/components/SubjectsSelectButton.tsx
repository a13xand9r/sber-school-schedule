import { IconChevronDown, IconChevronUp } from '@sberdevices/plasma-icons'
import { Body1, Button, TextField } from '@sberdevices/plasma-ui'
import React, { FC, useState } from 'react'
import { SubjectConstType } from '../../../store'
import style from '../../../styles/schedule.module.css'

export const SubjectSelectButton: FC<PropsType> = ({ changeSubjectListMode, selectedSubject, isSubjectListMode, isError, subjectInput, setSubjectInput }) => {
  return <>
    <TextField
      className={`${style.subjectInput} ${isError && style.errorSubjectInput}`}
      value={subjectInput}
      label={'Предмет'}
      onFocus={changeSubjectListMode}
      contentLeft={
        <Button
          onClick={changeSubjectListMode}
          view='clear'
          size='s'
          style={{ padding: '0', color: '#808080' }}>
          {
            isSubjectListMode ?
              <IconChevronUp size="s" /> :
              <IconChevronDown size="s" />
          }
        </Button>
      }
      placeholder='Предмет'
      disabled={false}
      onChange={t => setSubjectInput(t.target.value)}
    />
  </>
}

type PropsType = {
  changeSubjectListMode: () => void
  selectedSubject: null | SubjectConstType
  isError: boolean
  isSubjectListMode: boolean
  subjectInput: string
  setSubjectInput: (str: string) => void
}