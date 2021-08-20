import { Body1, Button, Footnote1 } from '@sberdevices/plasma-ui'
import Image from 'next/image'
import React, { FC } from 'react'
import { dateDaysArray, monthsArray, SubjectConstType, TabsType } from '../../../store'
import style from '../../../styles/schedule.module.css'

export const SubjectItem: FC<PropsType> = (props) => {
  const { icon, subject, tab, cabinet, isEditMode, teacher, deleteItem, index, date, onClick, searchText, id } = props
  return <div tabIndex={1} onClick={() => !!onClick ? onClick(index) : null} className={style.taskItem}>
    <Image priority={true} loading='eager' src={icon} alt='' layout='fixed' width={35} height={35} />
    <div className={style.subjectText}>
      <Body1>{subject}</Body1>
      {
        tab === 'Домашка' ?
          <Footnote1 className={style.subjectFooter}>
            На {`${date?.getDate()} ${monthsArray[date?.getMonth() as number]}, ${date?.getFullYear()} (${dateDaysArray[date?.getDay() as number].toLowerCase()})`}
          </Footnote1> :
          <Footnote1 className={style.subjectFooter}>{cabinet && `Кабинет ${cabinet} ${"\u2022"}`} {teacher && teacher}</Footnote1>
      }
    </div>
    {(isEditMode && !!deleteItem && tab === 'Расписание' && id) &&
      <span onClick={() => deleteItem(id)} className={style.deleteItem}></span>}
  </div>
}

type PropsType = {
  tab: TabsType
  icon: string
  cabinet?: string | null
  teacher?: string | null
  subject: SubjectConstType
  isEditMode?: boolean
  deleteItem?: (id: string) => void
  id?: string
  index: number
  date?: Date
  onClick?: (index: number) => void
  searchText?: string
}