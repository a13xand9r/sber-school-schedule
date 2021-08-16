import { IconWarning } from '@sberdevices/plasma-icons'
import { Body1, Button, Cell, CellIcon, Footnote1, Headline3, TextBox } from '@sberdevices/plasma-ui'
import { allSubjects, SubjectType } from '../store'
import Image from 'next/image'
import style from '../styles/schedule.module.css'
import React, { FC } from 'react'

export const SubjectList: FC<PropsType> = ({ list, isEditMode, deleteItem }) => {
  return <>
    {(!list || !list.length) ?
      <div className={style.emptyList}>
        <IconWarning className={style.warningIcon} />
        <br />
        <Headline3 className={style.headline}>В этот день нет ни одного урока</Headline3>
        <Body1>Нажмите на кнопку ниже, чтобы {isEditMode ? 'добавить предмет' : 'перейти к редактированию расписания'}</Body1>
      </div> :
      <div className={style.subjectList}>
        {list.map((subj, i) => <div key={subj.subject} className={style.subjectItem}>
            <Image src={subj.icon} alt='' layout='fixed' width={35} height={35} />
            <div className={style.subjectText}>
              <Body1>{subj.subject}</Body1>
              <Footnote1 className={style.subjectFooter}>Кабинет {subj.cabinet} &bull; {subj.teacher}</Footnote1>
            </div>
            {isEditMode && <span onClick={() => deleteItem(i)} className={style.deleteItem}></span>}
          </div>
        )}
      </div>
    }
  </>
}

type PropsType = {
  list: SubjectType[] | null
  isEditMode: boolean
  deleteItem: (index: number) => void
}