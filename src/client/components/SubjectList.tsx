import { IconWarning } from '@sberdevices/plasma-icons'
import { Body1, Button, Cell, CellIcon, Footnote1, Headline3, TextBox } from '@sberdevices/plasma-ui'
import { allSubjects, SubjectType } from '../../../store'
import Image from 'next/image'
import style from '../../../styles/schedule.module.css'
import React, { FC } from 'react'
import { EmptyList } from './EmptyList'
import { TaskItem } from './subjectItem'

export const SubjectList: FC<PropsType> = ({ list, isEditMode, deleteItem }) => {
  return <>
    {(!list || !list.length) ?
      <EmptyList
        isEditMode={isEditMode}
        tab={'Расписание'}
      /> :
      <div className={style.subjectList}>
        {list.map((subj, i) => <TaskItem
          key={i}
          tab='Расписание'
          icon={subj.icon}
          cabinet={subj.cabinet}
          teacher={subj.teacher}
          index={i}
          subject={subj.subject}
          deleteItem={deleteItem}
          isEditMode={isEditMode}
          id={subj.id}
        />
        // <div key={subj.subject} className={style.subjectItem}>
        //   <Image src={subj.icon} alt='' layout='fixed' width={35} height={35} />
        //   <div className={style.subjectText}>
        //     <Body1>{subj.subject}</Body1>
        //     <Footnote1 className={style.subjectFooter}>Кабинет {subj.cabinet} &bull; {subj.teacher}</Footnote1>
        //   </div>
        //   {isEditMode && <span onClick={() => deleteItem(i)} className={style.deleteItem}></span>}
        // </div>
        )}
      </div>
    }
  </>
}

type PropsType = {
  list: SubjectType[] | null
  isEditMode: boolean
  deleteItem: (id: string) => void
}