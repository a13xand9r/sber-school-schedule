
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
    case 'CHANGE_TAB':
      return { ...state, tabPage: action.tab }
    case 'ADD_SUBJECT':
      const returnObj = { ...state, schedule: { ...state.schedule } }
      returnObj.schedule[state.day] = state.schedule[state.day] !== null ?
        [...state.schedule[state.day] as Array<SubjectType>, action.newSubject] :
        [action.newSubject]
      return returnObj
  }
}

export const actions = {
  changeDay: (day: DayType) => ({ type: 'CHANGE_DAY', day } as const),
  changeTab: (tab: TabsType) => ({ type: 'CHANGE_TAB', tab } as const),
  addSubject: (newSubject: SubjectType) => ({ type: 'ADD_SUBJECT', newSubject } as const),
}
export const allSubjects = [
  { subject: 'Алгебра', icon: '/algebra.png' as string },
  { subject: 'Астрономия', icon: '/astron.png' as string },
  { subject: 'Русский язык', icon: '/russia.png' as string },
  { subject: 'Белорусский язык', icon: '/by.png' as string },
  { subject: 'Украинский язык', icon: '/ukr.png' as string },
  { subject: 'Казахский язык', icon: '/kazakhstan.png' as string },
  { subject: 'Английский язык', icon: '/english.png' as string },
  { subject: 'Немецкий язык', icon: '/germany.png' as string },
  { subject: 'Франузский язык', icon: '/franc.png' as string },
  { subject: 'Родной язык', icon: '/books.png' as string },
  { subject: 'Биология', icon: '/biology.png' as string },
  { subject: 'Всемирная история', icon: '/history.png' as string },
  { subject: 'География', icon: '/earth.png' as string },
  { subject: 'Геометрия', icon: '/geometry.png' as string },
  { subject: 'Естествознание', icon: '/tree.png' as string },
  { subject: 'Зарубежная литература', icon: '/books.png' as string },
  { subject: 'Зарубежный язык', icon: '/books.png' as string },
  { subject: 'Информатика', icon: '/it.png' as string },
  { subject: 'Искусство', icon: '/art.png' as string },
  { subject: 'История', icon: '/history.png' as string },
  { subject: 'Классный час', icon: '/time.png' as string },
  { subject: 'Математика', icon: '/algebra.png' as string },
  { subject: 'Мировая художественная культура', icon: '/books.png' as string },
  { subject: 'Музыка(пение)', icon: '/music.png' as string },
  { subject: 'Начальная военная подготовка', icon: '/army.png' as string },
  { subject: 'Обществознание', icon: '/society.png' as string },
  { subject: 'Основы безопасности жизнедеятельности', icon: '/family.png' as string },
  { subject: 'Основы экономики', icon: '/economy.png' as string },
  { subject: 'Правоведение', icon: '/pravo.png' as string },
  { subject: 'Природоведение', icon: '/tree.png' as string },
  { subject: 'Рисование', icon: '/art.png' as string },
  { subject: 'Родная литература', icon: '/books.png' as string },
  { subject: 'Технология', icon: '/hammer.png' as string },
  { subject: 'Труд', icon: '/hammer.png' as string },
  { subject: 'Физика', icon: '/biology.png' as string },
  { subject: 'Физкультура', icon: '/ball.png' as string },
  { subject: 'Философия', icon: '/books.png' as string },
  { subject: 'Химия', icon: '/chemistry.png' as string },
  { subject: 'Хореография', icon: '/choreography.png' as string },
  { subject: 'Черчение', icon: '/drawing.png' as string },
  { subject: 'Чтение', icon: '/books.png' as string },
  { subject: 'Экология', icon: '/ecology.png' as string },
] as const

type InferActionType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
type InferSubjectType<T> = T extends { subject: infer U } ? U : never
export type ActionsType = InferActionType<typeof actions>
export type StateType = typeof initialState
type TabsType = 'Расписание' | 'Домашка'
export type DayType = 'Понедельник' | 'Вторник' | 'Среда' | 'Четверг' | 'Пятница' | 'Суббота'
export type SubjectConstType = InferSubjectType<typeof allSubjects[number]>
export type SubjectType = {
  subject: SubjectConstType
  icon: string
  teacher: string
  cabinet: string
}