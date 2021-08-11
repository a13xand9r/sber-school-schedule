import { IconWarning } from '@sberdevices/plasma-icons'
import { Body1, Headline3 } from '@sberdevices/plasma-ui'
import { SubjectType } from '../store'
import Image from 'next/image'
import style from '../styles/schedule.module.css'

export const SubjectList = ({ list }: { list: SubjectType[] | null }) => {
  if (!list || !list.length) {
    return <div className={style.subjectList}>
      <IconWarning className={style.warningIcon} />
      <br />
      <Headline3 className={style.headline}>В этот день нет ни одного урока</Headline3>
      <Body1>Нажмите на кнопку, чтобы добавить урок</Body1>

    </div>
  }
  return (
    <div></div>
  )
}