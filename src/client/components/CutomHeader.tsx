import { IconAvatar, IconClose, IconEdit, IconPlus } from '@sberdevices/plasma-icons'
import { Button, Header, HeaderBack, HeaderContent, HeaderLogo, HeaderMinimize, HeaderRoot, HeaderSubtitle, HeaderTitle, HeaderTitleWrapper } from '@sberdevices/plasma-ui'
import React, { FC, useState } from 'react'
import { daysArray, HomeTaskType, monthsArray, TabsType } from '../../../store'
import style from '../../../styles/header.module.css'

export const CustomHeader: FC<PropsType> = ({ isEditMode, setEditMode, tab, homeTask, setIsAddTaskMode, isAddTaskMode, setShowTaskMode }) => {
  const flag: boolean = !!homeTask ? true : false
  const onBackHandler = () => {
    // setEditMode(false)
    // setIsAddTaskMode(false)
    setShowTaskMode(null)
  }
  return (
    //@ts-ignore
    <Header
      className={style.header}
      back={flag}
      title={
        homeTask ? `Д/З на ${homeTask.date.getDate()} ${monthsArray[homeTask.date.getMonth() - 1]}, ${homeTask.date.getFullYear()} (${daysArray[homeTask.date.getDay()][0].toLocaleLowerCase()})` :
          'Школьное распиcание'}
      subtitle={homeTask ? `по ${homeTask.subSubject.toLowerCase()}` : undefined}
      onBackClick={onBackHandler}
    >
      {
        tab === 'Домашка' ?
          !!homeTask ?
            <Button
              view='clear'
              onClick={() => setShowTaskMode(null)}
            ><IconClose />
            </Button> :
          isAddTaskMode ?
            <Button
              view='clear'
              onClick={() => setIsAddTaskMode(false)}
            ><IconClose />
            </Button> :
            <Button
              view='clear'
              onClick={() => setIsAddTaskMode(true)}
            ><IconPlus />
            </Button> :
          isEditMode ?
            <Button
              view='clear'
              onClick={() => setEditMode(false)}
            ><IconClose />
            </Button> :
            <Button
              view='clear'
              onClick={() => setEditMode(true)}
            ><IconEdit />
            </Button>
      }
    </Header>
  )
}

type PropsType = {
  isEditMode: boolean
  setEditMode: (flag: boolean) => void
  tab: TabsType
  homeTask: HomeTaskType | null
  isAddTaskMode: boolean
  setShowTaskMode: (index: number | null) => void
  setIsAddTaskMode: (flag: boolean) => void
}