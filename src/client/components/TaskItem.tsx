import { Body1, Button, Footnote1 } from '@sberdevices/plasma-ui'
import Image from 'next/image'
import React, { FC } from 'react'
import { daysArray, monthsArray, SubjectConstType } from '../../../store'
import style from '../../../styles/schedule.module.css'

export const TaskItem: FC<PropsType> = (props) => {
  const { icon, subject, cabinet, isEditMode, teacher, deleteItem, index, date, onClick } = props
  return <Button
    view='clear'
    onClick={() => onClick(index)}
    className={style.taskButton}
    contentLeft={<Image src={icon} alt='' layout='fixed' width={35} height={35} />}
    text={
      <div className={style.subjectText}>
        <Body1>{subject}</Body1>
        <Footnote1 className={style.subjectFooter}>
          На {`${date.getDate()} ${monthsArray[date.getMonth() - 1]}, ${date.getFullYear()} (${daysArray[date.getDay()][0].toLocaleLowerCase()})`}
        </Footnote1>
      </div>}
  />
}

type PropsType = {
  icon: string
  cabinet?: string
  teacher?: string
  subject: SubjectConstType
  isEditMode?: boolean
  deleteItem?: (index: number) => void
  index: number
  date: Date
  onClick: (index: number) => void
}