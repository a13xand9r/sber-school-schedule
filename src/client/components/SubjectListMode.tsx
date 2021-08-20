import { Body1, Button } from '@sberdevices/plasma-ui'
import Image from 'next/image'
import React from 'react'
import { allSubjects, SubjectWithIconsType } from '../../../store'
import style from '../../../styles/schedule.module.css'
import { TaskItem } from './TaskItem'

export const SubjectListMode = ({onSubjectClick, query}: {onSubjectClick: (subject: SubjectWithIconsType) => void, query: string}) => {
  return (
    <div className={style.subjectsSelect}>
        {allSubjects.filter(subj => subj.subject.toLowerCase().includes(query.toLowerCase())).map((subj, i) => (
          <TaskItem
            key={i}
            subject={subj.subject}
            icon={subj.icon}
            index={i}
            tab='Расписание'
            onClick={() => onSubjectClick(subj)}
            searchText={query}
          />
          // <Button
          //   size='s'
          //   className={style.subjectButton}
          //   key={subj.subject}
          //   view='secondary'
          //   onClick={() => onSubjectClick(subj)}
          // >
          //   <>
          //     <Image src={subj.icon} alt='' layout='fixed' width={25} height={25} />
          //     <Body1 className={style.subjectText}>{subj.subject}</Body1>
          //   </>
          // </Button>
        ))}
      </div>
  )
}
