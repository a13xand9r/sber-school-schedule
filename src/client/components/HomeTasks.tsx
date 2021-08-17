import { Body1, Button, StyledCard } from '@sberdevices/plasma-ui'
import React, { Dispatch, FC, useEffect, useState } from 'react'
import { actions, ActionsType, HomeTaskType } from '../../../store'
import { EmptyList } from './EmptyList'
import { TaskItem } from './TaskItem'
import style from '../../../styles/schedule.module.css'
import { AddTaskForm } from './AddTaskForm'

export const HomeTasks: FC<PropsType> = ({ homeTasks, dispatch, showTaskMode, isAddTaskMode }) => {
  const onTaskClickHandler = (index: number) => {
    dispatch(actions.setShowTaskMode(index))
  }
  useEffect(() => {
    return () => {
      dispatch(actions.setShowTaskMode(null))
      dispatch(actions.setIsAddTaskMode(false))
    }
  }, [])
  return <div className={style.schedule}>
    {showTaskMode ? <Body1>{showTaskMode.task}</Body1> :
      isAddTaskMode ? <AddTaskForm
        dispatch={dispatch}
        finishAdding={() => dispatch(actions.setIsAddTaskMode(false))}
      /> :
        homeTasks.length === 0 ? <>
          <EmptyList isEditMode={false} tab='Домашка' />
          <Button className={style.editButton}
            text='Добавить домашнее задание'
            view='secondary'
            onClick={() => dispatch(actions.setIsAddTaskMode(true))}
          />
        </> :
          homeTasks.map((task, i) =>
            <TaskItem
              key={task.task}
              date={task.date}
              icon={task.icon}
              index={i}
              onClick={onTaskClickHandler}
              subject={task.subject}
            />)
    }
  </div>
}

type PropsType = {
  homeTasks: HomeTaskType[]
  dispatch: Dispatch<ActionsType>
  showTaskMode: null | HomeTaskType
  isAddTaskMode: boolean
}