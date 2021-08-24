import { Button } from '@sberdevices/plasma-ui'
import React, { Dispatch, FC, useCallback, useEffect } from 'react'
import { actions, ActionsType, HomeTaskType } from '../../../store'
import { EmptyList } from './EmptyList'
import { SubjectItemMemo } from './SubjectItem'
import style from '../../../styles/schedule.module.css'
import { AddTaskForm } from './AddTaskForm'
import { Task } from './Task'
import { deleteHomeTask } from '../apiRequests'

export const HomeTasks: FC<PropsType> = ({ homeTasks, dispatch, showTaskMode, isAddTaskMode, userId, assistantRef }) => {
  const onTaskClickHandler = useCallback((index: number) => {
    dispatch(actions.setShowTaskMode(index))
  }, [])
  const onDeleteTaskHandler = useCallback(() => {
    deleteHomeTask(userId as string, showTaskMode?.id as string)
    dispatch(actions.deleteHomeTask(showTaskMode?.id as string))
    dispatch(actions.setShowTaskMode(null))
  }, [userId, showTaskMode])
  const onDoneTaskHandler = useCallback(() => {
    onDeleteTaskHandler()
    assistantRef.current?.sendAction({ type: 'task_done' })
  }, [onDeleteTaskHandler, assistantRef])
  const finishAdding = useCallback(() => dispatch(actions.setIsAddTaskMode(false)), [])
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
        finishAdding={finishAdding}
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
            <SubjectItemMemo
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