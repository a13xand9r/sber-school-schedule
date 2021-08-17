import { IconChevronDown } from '@sberdevices/plasma-icons'
import { Body1, Button } from '@sberdevices/plasma-ui'
import React, { FC } from 'react'
import { SubjectConstType } from '../../../store'
import style from '../../../styles/schedule.module.css'

export const SubjectSelectButton: FC<PropsType> = ({changeSubjectListMode, selectedSubject}) => {
  return <Button
  className={style.subjectFormButton}
  onClick={changeSubjectListMode}
  view='secondary'
  contentRight={<IconChevronDown />}
  text={<Body1>{selectedSubject ? selectedSubject : 'Предмет'}</Body1>}
/>
}

type PropsType = {
  changeSubjectListMode: () => void
  selectedSubject: null | SubjectConstType
}