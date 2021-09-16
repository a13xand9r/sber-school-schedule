import React from 'react'
import { allSubjects, SubjectWithIconsType } from '../../../store'
import style from '../../../styles/schedule.module.css'
import { SubjectItem } from './SubjectItem'

export const SubjectListMode = ({onSubjectClick, query}: {onSubjectClick: (subject: SubjectWithIconsType) => void, query: string}) => {
  return (
    <div className={style.subjectsSelect}>
        {allSubjects.filter(subj => subj.subject.toLowerCase().includes(query.toLowerCase())).map((subj, i) => (
          <SubjectItem
            key={i}
            subject={subj.subject}
            icon={subj.icon}
            index={i}
            tab='Расписание'
            onClick={() => onSubjectClick(subj)}
            searchText={query}
          />
        ))}
      </div>
  )
}

export const SubjectListModeMemo = React.memo(SubjectListMode)
