import { TabItem, Tabs } from '@sberdevices/plasma-ui'
import React, { Dispatch, FC } from 'react'
import { actions, ActionsType, DayType } from '../store'
import style from '../styles/schedule.module.css'

export const Schedule: FC<PropsType> = ({ day, dispatch }) => {
    const daysArray = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'] as const
    return <div className={style.schedule}>
        {/* <div className={style.dayTab}> */}
            <Tabs
                size={'s'}
                view={'clear'}
                stretch={false}
                pilled={true}
                scaleOnPress={true}
                outlined={true}
                disabled={false}
            >
                {daysArray.map(tab => (
                    <TabItem
                        key={tab}
                        isActive={tab === day}
                        tabIndex={1}
                        onClick={() => dispatch(actions.changeDay(tab))}
                    >
                        {tab}
                    </TabItem>
                ))}
            </Tabs>
        {/* </div> */}
    </div>
}

type PropsType = {
    day: DayType
    dispatch: Dispatch<ActionsType>
}