import { Button } from '@sberdevices/plasma-ui'
import React, { Dispatch, FC, useCallback, useEffect, useRef, useState } from 'react'
import { actions } from '../../../store'
import { EmptyList } from './EmptyList'
import { SubjectItemMemo } from './SubjectItem'
import style from '../../../styles/schedule.module.css'
import { AddTaskForm } from './AddTaskForm'
import { Task } from './Task'
import { deleteHomeTask } from '../apiRequests'
import { createAssistant } from '@sberdevices/assistant-client'
import { CSSTransition } from 'react-transition-group'
import { ActionsType, HomeTaskType } from '../../types'

export const HomeTasks: FC<PropsType> = ({ homeTasks, dispatch, showTaskMode, isAddTaskMode, userId, assistant }) => {
  const [isAddTaskModeTransition, setIsAddTaskModeTransition] = useState(false)

  const onTaskClickHandler = useCallback((id: string) => {
    dispatch(actions.setShowTaskMode(id))
  }, [])

  useEffect(() => {
    isAddTaskMode && setIsAddTaskModeTransition(true)
  }, [])

  const userIdRef = useRef<string | null>()
  userIdRef.current = userId
  const onDeleteTaskHandler = useCallback(async (id: string) => {
    dispatch(actions.setIsFetching(true))
    try{
      await deleteHomeTask(userIdRef.current as string, id)
    } catch(e){
      alert('Какие-то неполадки. Попробуйте попозже.')
    }
    dispatch(actions.setIsFetching(false))
    dispatch(actions.deleteHomeTask(id))
    dispatch(actions.setShowTaskMode(null))
  }, [userIdRef, dispatch])

  const onDoneTaskHandler = async (id: string) => {
    await onDeleteTaskHandler(id)
    assistant.sendAction({ type: 'task_done', payload: {} })
  }

  const finishAdding = useCallback(() => dispatch(actions.setIsAddTaskMode(false)), [])

  useEffect(() => {
    assistant.on('data', ({ smart_app_data }: any) => {
      // console.log('smart_app_data HomeTasks',smart_app_data)
      if (smart_app_data?.type === 'ASSISTANT_DELETE_HOME_TASK') {
        onDeleteTaskHandler(smart_app_data.id)
      }
      if (smart_app_data?.type === 'ASSISTANT_SET_HOME_TASK_DONE') {
        onDoneTaskHandler(smart_app_data.id)
      }
    })
    return () => {
      dispatch(actions.setShowTaskMode(null))
      dispatch(actions.setIsAddTaskMode(false))
      const unsubscribe = assistant.sendAction({type: 'unsubscribe', payload: {}})
      unsubscribe()
    }
  }, [])
  return <div className={style.schedule}>
    <CSSTransition
      in={isAddTaskMode}
      timeout={200}
      classNames='formTransition'
      unmountOnExit
      onEnter={() => setIsAddTaskModeTransition(true)}
      onExited={() => setIsAddTaskModeTransition(false)}
    >
      <AddTaskForm
        assistant={assistant}
        dispatch={dispatch}
        userId={userId}
        finishAdding={finishAdding}
      />
    </CSSTransition>
    {showTaskMode ?
      <Task
        showTaskMode={showTaskMode}
        onDelete={onDeleteTaskHandler}
        onDone={onDoneTaskHandler}
      /> :
      isAddTaskModeTransition ? null :
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
              key={task.id}
              id={task.id}
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
  assistant: ReturnType<typeof createAssistant>
}