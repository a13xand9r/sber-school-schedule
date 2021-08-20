import { Body1, Button, StyledCard } from '@sberdevices/plasma-ui'
import React, { Dispatch, FC, Ref, useEffect, useState } from 'react'
import { actions, ActionsType, HomeTaskType } from '../../../store'
import { EmptyList } from './EmptyList'
import { TaskItem } from './subjectItem'
import style from '../../../styles/schedule.module.css'
import { AddTaskForm } from './AddTaskForm'
import { Task } from './Task'
import { deleteHomeTask } from '../apiRequests'
import { createAssistant } from '@sberdevices/assistant-client'

export const HomeTasks: FC<PropsType> = ({ homeTasks, dispatch, showTaskMode, isAddTaskMode, userId, assistantRef }) => {
  const onTaskClickHandler = (index: number) => {
    dispatch(actions.setShowTaskMode(index))
  }
  const onDeleteTaskHandler = () => {
    deleteHomeTask(userId as string, showTaskMode?.id as string)
    dispatch(actions.deleteHomeTask(showTaskMode?.id as string))
    dispatch(actions.setShowTaskMode(null))
  }
  const onDoneTaskHandler = () => {
    deleteHomeTask(userId as string, showTaskMode?.id as string)
    dispatch(actions.deleteHomeTask(showTaskMode?.id as string))
    dispatch(actions.setShowTaskMode(null))
    assistantRef.current?.sendAction({ type: 'task_done' })
  }
  useEffect(() => {
    return () => {
      dispatch(actions.setShowTaskMode(null))
      dispatch(actions.setIsAddTaskMode(false))
    }
  }, [])
  return <div className={style.schedule}>
    {showTaskMode ? <Task showTaskMode={showTaskMode} onDelete={onDeleteTaskHandler} onDone={onDoneTaskHandler} /> :
      isAddTaskMode ? <AddTaskForm
        dispatch={dispatch}
        userId={userId}
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
              key={i}
              tab='Домашка'
              date={task.date}
              icon={task.icon}
              index={i}
              onClick={onTaskClickHandler}
              subject={task.subject}
            />
          )
    }
  </div>
}

type PropsType = {
  homeTasks: HomeTaskType[]
  dispatch: Dispatch<ActionsType>
  showTaskMode: null | HomeTaskType
  isAddTaskMode: boolean
  userId: string | null
  assistantRef: any
}