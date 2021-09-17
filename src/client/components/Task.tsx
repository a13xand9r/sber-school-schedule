import { Body1, Button } from '@sberdevices/plasma-ui'
import React, { FC } from 'react'
import style from '../../../styles/schedule.module.css'
import { HomeTaskType } from '../../types'

export const Task: FC<PropsType> = ({showTaskMode, onDelete, onDone}) => {
  return <>
    <Body1>{showTaskMode.task}</Body1>
    <div className={style.deleteTaskButton}>
      <Button onClick={onDone} style={{display: 'block', marginRight: '1rem'}} view='success'>Сделано</Button>
      <Button onClick={onDelete} style={{display: 'block', marginLeft: '1rem'}} view='critical'>Удалить</Button>
    </div>
  </>
}

type PropsType = {
  showTaskMode: HomeTaskType
  onDelete: () => void
  onDone: () => void
}