
export const initialState = {
    tabPage: 'Расписание' as TabsType,
    day: 'Понедельник' as DayType
}


export const reducer = (state: StateType, action: ActionsType): StateType => {
    switch(action.type){
        case 'CHANGE_DAY':
            return {...state, day: action.day}
        case 'CHANGE_TAB': {
            return {...state, tabPage: action.tab}
        }
    }
}

export const actions = {
    changeDay: (day: DayType) => ({type: 'CHANGE_DAY', day} as const),
    changeTab: (tab: TabsType) => ({type: 'CHANGE_TAB', tab} as const),
}

type InferActionType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
export type ActionsType = InferActionType<typeof actions>
type StateType = typeof initialState
type TabsType = 'Расписание' | 'Домашка'
export type DayType = 'Понедельник' | 'Вторник' | 'Среда' | 'Четверг' | 'Пятница' | 'Суббота'