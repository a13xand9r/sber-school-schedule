
export const initialState = {
  tabPage: 'Расписание' as TabsType,
  day: 'Понедельник' as DayType,
  schedule: {
    'Понедельник': null as null | SubjectType[],
    'Вторник': null as null | SubjectType[],
    'Среда': null as null | SubjectType[],
    'Четверг': null as null | SubjectType[],
    'Пятница': null as null | SubjectType[],
    'Суббота': null as null | SubjectType[],
  }
}


export const reducer = (state: StateType, action: ActionsType): StateType => {
  switch (action.type) {
    case 'CHANGE_DAY':
      return { ...state, day: action.day }
    case 'CHANGE_TAB': {
      return { ...state, tabPage: action.tab }
    }
  }
}

export const actions = {
  changeDay: (day: DayType) => ({ type: 'CHANGE_DAY', day } as const),
  changeTab: (tab: TabsType) => ({ type: 'CHANGE_TAB', tab } as const),
}

const subjects = [{ subject: 'Алгебра', icon: '' },
  { subject: 'Английский', icon: '' },
  { subject: 'Астрономия', icon: '' },
  { subject: 'Русский язык', icon: '' },
  { subject: 'Белорусский язык', icon: '' },
  { subject: 'Украинский язык', icon: '' },
  { subject: 'Казахский язык', icon: '' },
  { subject: 'Английский язык', icon: '' },
  { subject: 'Немецкий язык', icon: '' },
  { subject: 'Франузский язык', icon: '' },
  { subject: 'Родной язык', icon: '' },
  { subject: 'Биология', icon: '' },
  { subject: 'Всемирная история', icon: '' },
  { subject: 'География', icon: '' },
  { subject: 'Геометрия', icon: '' },
  { subject: 'Естествознание', icon: '' },
  { subject: 'Зарубежная литература', icon: '' },
  { subject: 'Информатика', icon: '' },
  { subject: 'Искусство', icon: '' },
  { subject: 'История', icon: '' },
  { subject: 'Классный час', icon: '' },
  { subject: 'Математика', icon: '' },
  { subject: 'Мировая художественная культура', icon: '' },
  { subject: 'Музыка(пение)', icon: '' },
  { subject: 'Начальная военная подготовка', icon: '' },
  { subject: 'Обществознание', icon: '' },
  { subject: 'Основы безопасности жизнедеятельности', icon: '' },
  { subject: 'Основы экономики', icon: '' },
  { subject: 'Правоведение', icon: '' },
  { subject: 'Природоведение', icon: '' },
  { subject: 'Рисование', icon: '' },
  { subject: 'Родная литература', icon: '' },
  { subject: 'Технология', icon: '' },
  { subject: 'Труд', icon: '' },
  { subject: 'Физика', icon: '' },
  { subject: 'Физкультура', icon: '' },
  { subject: 'Философия', icon: '' },
  { subject: 'Химия', icon: '' },
  { subject: 'Хореография', icon: '' },
  { subject: 'Черчение', icon: '' },
  { subject: 'Чтение', icon: '' },
  { subject: 'Экология', icon: '' },
] as const

type InferActionType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
export type ActionsType = InferActionType<typeof actions>
type StateType = typeof initialState
type TabsType = 'Расписание' | 'Домашка'
export type DayType = 'Понедельник' | 'Вторник' | 'Среда' | 'Четверг' | 'Пятница' | 'Суббота'
export type SubjectType = typeof subjects[number]
// export type SubjectType = ReturnType<typeof subjectTypeFunc>