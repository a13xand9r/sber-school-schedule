import { IconClose, IconEdit, IconPlus } from '@sberdevices/plasma-icons'
import { Button, Header, HeaderLogo } from '@sberdevices/plasma-ui'
import React, { FC, useContext } from 'react'
import { CharacterContext } from '../../../pages'

import { daysArray, HomeTaskType, monthsArray, TabsType } from '../../../store'
import style from '../../../styles/header.module.css'

export const CustomHeader: FC<PropsType> = ({
  isEditMode,
  setEditMode,
  tab,
  homeTask,
  setIsAddTaskMode,
  isAddTaskMode,
  setShowTaskMode,
  isFetching,
  isAddSubjectMode,
  setIsAddSubjectMode
}) => {
  const flag: boolean = !!homeTask || isAddSubjectMode
  const {surface} = useContext(CharacterContext)
  const onBackHandler = () => {
    setShowTaskMode(null)
    setIsAddSubjectMode(false)
  }
  return (
    //@ts-ignore
    <Header
      className={style.header}
      back={flag}
      title={
        homeTask ? `Д/З на ${homeTask.date?.getDate()} ${monthsArray[homeTask.date?.getMonth() - 1]}, ${homeTask.date?.getFullYear()} (${daysArray[homeTask.date?.getDay()][0].toLocaleLowerCase()})` :
          'Школьное распиcание'}
      subtitle={homeTask ? `по ${homeTask.subSubject.toLowerCase()}` : undefined}
      onBackClick={onBackHandler}
    >
      {
        !isFetching && surface === 'mobile' && (
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
              text={<IconEdit />}
            />
        )
      }
    </Header>
  )
}

type PropsType = {
  isEditMode: boolean
  setEditMode: (flag: boolean) => void
  isFetching: boolean
  tab: TabsType
  homeTask: HomeTaskType | null
  isAddTaskMode: boolean
  setShowTaskMode: (id: string | null) => void
  setIsAddTaskMode: (flag: boolean) => void
  isAddSubjectMode: boolean
  setIsAddSubjectMode: (flag: boolean) => void
}

{/* <HeaderRoot>
<IconEdit
// onClick={() => {
//   action('onBackClick')();
//   setIsBack(false);
// }}
/>

<HeaderTitleWrapper>
  <>
    <HeaderTitle>{
      homeTask ? `Д/З на ${homeTask.date.getDate()} ${monthsArray[homeTask.date.getMonth() - 1]}, ${homeTask.date.getFullYear()} (${daysArray[homeTask.date.getDay()][1].toLocaleLowerCase()})` :
        'Школьное распиcание'}</HeaderTitle>
    {!!homeTask && <HeaderSubtitle >{`по ${homeTask.subSubject.toLowerCase()}`}</HeaderSubtitle>}
  </>
</HeaderTitleWrapper>
<HeaderContent>
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
</HeaderContent>
</HeaderRoot> */}