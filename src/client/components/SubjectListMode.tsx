import { Body1, Button } from '@sberdevices/plasma-ui'
import Image from 'next/image'
import React from 'react'
import { allSubjects, SubjectWithIconsType } from '../../../store'
import style from '../../../styles/schedule.module.css'

export const SubjectListMode = ({onSubjectClick}: {onSubjectClick: (subject: SubjectWithIconsType) => void}) => {
  return (
    <div className={style.subjectsSelect}>
        {allSubjects.map(subj => (
          <Button
            size='s'
            className={style.subjectButton}
            key={subj.subject}
            view='secondary'
            onClick={() => onSubjectClick(subj)}
          >
            <>
              <Image src={subj.icon} alt='' layout='fixed' width={25} height={25} />
              <Body1 className={style.subjectText}>{subj.subject}</Body1>
            </>
          </Button>
        ))}
      </div>
  )
}
