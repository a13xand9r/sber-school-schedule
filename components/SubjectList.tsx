import { IconWarning } from '@sberdevices/plasma-icons'
import { Body1, Button, Cell, CellIcon, Footnote1, Headline3, TextBox } from '@sberdevices/plasma-ui'
import { allSubjects, SubjectType } from '../store'
import Image from 'next/image'
import style from '../styles/schedule.module.css'
import React from 'react'

export const SubjectList = ({ list }: { list: SubjectType[] | null }) => {
  console.log(list)
  return <>
    {(!list || !list.length) ?
      <div className={style.emptyList}>
        <IconWarning className={style.warningIcon} />
        <br />
        <Headline3 className={style.headline}>В этот день нет ни одного урока</Headline3>
        <Body1>Нажмите на кнопку, чтобы добавить предмет</Body1>
      </div> :
      <div className={style.subjectList}>
        {list.map(subj => <div key={subj.subject}>
          <div className={style.subjectItem}>
            <Image src={subj.icon} alt='' layout='fixed' width={35} height={35} />
            <div className={style.subjectText}>
              <Body1>{subj.subject}</Body1>
              <Footnote1 className={style.subjectFooter}>Кабинет {subj.cabinet} &bull; {subj.teacher}</Footnote1>
            </div>
          </div>
        </div>)}
      </div>
    }
  </>
}