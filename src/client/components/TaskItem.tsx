import { Body1, Button, Footnote1 } from '@sberdevices/plasma-ui'
import Image from 'next/image'
import React, { FC } from 'react'
import { dateDaysArray, monthsArray, SubjectConstType, TabsType } from '../../../store'
import style from '../../../styles/schedule.module.css'

export const TaskItem: FC<PropsType> = (props) => {
  const { icon, subject, tab, cabinet, isEditMode, teacher, deleteItem, index, date, onClick } = props
  return <div tabIndex={1} onClick={() => !!onClick ? onClick(index) : null} className={style.taskItem}>
    <Image src={icon} alt='' layout='fixed' width={35} height={35} />
    <div className={style.subjectText}>
      <Body1>{subject}</Body1>
      {
        tab === 'Домашка' ?
          <Footnote1 className={style.subjectFooter}>
            На {`${date?.getDate()} ${monthsArray[date?.getMonth() as number]}, ${date?.getFullYear()} (${dateDaysArray[date?.getDay() as number].toLowerCase()})`}
          </Footnote1> :
          <Footnote1 className={style.subjectFooter}>Кабинет {cabinet} &bull; {teacher}</Footnote1>
      }
    </div>
    {(isEditMode && deleteItem && tab === 'Расписание') &&
      <span onClick={() => deleteItem(index)} className={style.deleteItem}></span>}
  </div>
  // <Button
  //   view='secondary'
  //   onClick={() => onClick(index)}
  //   className={style.taskButton}
  //   contentLeft={<Image src={icon} alt='' layout='fixed' width={35} height={35} />}
  //   text={
  //     <div className={style.subjectText}>
  //       <Body1>{subject}</Body1>
  //       <Footnote1 className={style.subjectFooter}>
  //         На {`${date.getDate()} ${monthsArray[date.getMonth()]}, ${date.getFullYear()} (${daysArray[date.getDay()][0].toLowerCase()})`}
  //       </Footnote1>
  //     </div>}
  // />
}

type PropsType = {
  tab: TabsType
  icon: string
  cabinet?: string | null
  teacher?: string | null
  subject: SubjectConstType
  isEditMode?: boolean
  deleteItem?: (index: number) => void
  index: number
  date?: Date
  onClick?: (index: number) => void
}