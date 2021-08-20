import { Body1, Button } from '@sberdevices/plasma-ui'
import React, { FC } from 'react'
import { HomeTaskType } from '../../../store'
import style from '../../../styles/schedule.module.css'

export const Task: FC<PropsType> = ({showTaskMode, onDelete}) => {
  return <>
    <Body1>{showTaskMode.task}</Body1>
    <div className={style.deleteTaskButton}>
      <Button onClick={onDelete} view='critical'>Удалить</Button>
    </div>
  </>
}

type PropsType = {
  showTaskMode: HomeTaskType
  onDelete: () => void
}