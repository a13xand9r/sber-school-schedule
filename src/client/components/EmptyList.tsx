import { IconWarning } from '@sberdevices/plasma-icons'
import { Body1, Headline3 } from '@sberdevices/plasma-ui'
import React, { FC, useContext } from 'react'
import { CharacterContext } from '../../../pages'
import { TabsType } from '../../../store'
import style from '../../../styles/schedule.module.css'

export const EmptyList: FC<PropsType> = ({ isEditMode, tab }) => {
  const {character, surface} = useContext(CharacterContext)
  return <div className={style.emptyList}>
    <IconWarning className={style.warningIcon} />
    <br />
    {tab === 'Расписание' ?
      <Headline3 className={style.headline}>В этот день нет ни одного урока</Headline3> :
      <Headline3 className={style.headline}>У {character === 'joy' ? 'тебя' : 'вас'} нет домашних заданий</Headline3>

    }
    {
      surface === 'mobile' ?
      <Body1>{character === 'joy' ? 'Нажми' : 'Нажмите'} на кнопку ниже, чтобы {tab === 'Домашка' ? 'добавить д/з' :
      isEditMode ? 'добавить предмет' : 'перейти к редактированию расписания'}</Body1> :
      <Body1>Для {character === 'joy' ? 'твоего' : 'вашего'} удобства {tab === 'Домашка' ? 'добавить д/з' :
      'редактировать расписание'} можно в приложении Салют или на sberPortal</Body1>
    }
  </div>
}

type PropsType = {
  isEditMode?: boolean
  tab: TabsType
}