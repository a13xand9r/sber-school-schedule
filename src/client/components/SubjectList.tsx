import { SubjectType } from '../../../store'
import style from '../../../styles/schedule.module.css'
import React, { FC } from 'react'
import { EmptyList } from './EmptyList'
import { SubjectItemMemo } from './SubjectItem'

export const SubjectList: FC<PropsType> = ({ list, isEditMode, deleteItem, onClick }) => {
  return <>
    {(!list || !list.length) ?
      <EmptyList
        isEditMode={isEditMode}
        tab={'Расписание'}
      /> :
      <div className={style.subjectList}>
        {list.map((subj, i) => <SubjectItemMemo
          key={subj.id}
          tab='Расписание'
          onClick={onClick}
          icon={subj.icon}
          cabinet={subj.cabinet}
          teacher={subj.teacher}
          index={i}
          subject={subj.subject}
          deleteItem={deleteItem}
          isEditMode={isEditMode}
          id={subj.id}
        />
        )}
      </div>
    }
  </>
}

type PropsType = {
  list: SubjectType[] | null
  onClick?: (id: string) => void
  isEditMode: boolean
  deleteItem: (id: string) => void
}