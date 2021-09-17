import { accent } from '@sberdevices/plasma-tokens'
import { Body1, Footnote1 } from '@sberdevices/plasma-ui'
import Image from 'next/image'
import React, { FC } from 'react'
import styled from 'styled-components'
import { CharacterType } from '../../../GlobalStyle'
import style from '../../../styles/schedule.module.css'
import { SubjectConstType, TabsType } from '../../types'
import { dateDaysArray, monthsArray } from '../../utils/constants'

const ItemWrapper = styled.div`
  margin: 0 auto;
  max-width: 38rem;
  display: flex;
  height: 3.3rem;
  align-items: center;
  margin-top: 0.2rem;
  position: relative;
  /* border: 1px solid gray; */
  border-radius: 10px;
  padding-left: 1rem;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  transition: 0.2s;
  &:active, &::visited{
    transform: scale(0.98);
    outline: none;
  }
  &:focus-visible, &:focus {
    border: ${accent} solid 2px;
    border-radius: 10px;
    outline: none;
  }
`;

export const SubjectItem: FC<PropsType> = (props) => {
  const { icon, subject, tab, cabinet, isEditMode, teacher, deleteItem, index, date, onClick, searchText, id } = props

  const onDeleteHandler = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation()
    id && deleteItem && deleteItem(id)
  }

  return <ItemWrapper tabIndex={1} onClick={() => !!onClick ? onClick(id as string) : null}>
    <Image priority={true} loading='eager' src={icon} alt='' layout='fixed' width={35} height={35} />
    <div className={style.subjectText}>
      <Body1>{subject}</Body1>
      {
        tab === 'Домашка' ?
          <Footnote1 className={style.subjectFooter}>
            На {`${date?.getDate()} ${monthsArray[date?.getMonth() as number]}, ${date?.getFullYear()} (${dateDaysArray[date?.getDay() as number].toLowerCase()})`}
          </Footnote1> :
          <Footnote1 className={style.subjectFooter}>{cabinet && `Кабинет ${cabinet} ${"\u2022"}`} {teacher && teacher}</Footnote1>
      }
    </div>
    {(isEditMode && tab === 'Расписание') &&
      <span onClick={onDeleteHandler} className={style.deleteItem}></span>}
  </ItemWrapper>
}

export const SubjectItemMemo = React.memo(SubjectItem)

type PropsType = {
  tab: TabsType
  icon: string
  cabinet?: string | null
  teacher?: string | null
  subject: SubjectConstType
  isEditMode?: boolean
  deleteItem?: (id: string) => void
  id?: string
  index: number
  date?: Date
  onClick?: (id: string) => void
  searchText?: string
}
type StyledProps = {
  character: CharacterType
}