import { CharacterType } from './GlobalStyle'
import _ from 'lodash'

export const initialState = {
  userId: null as null | string,
  character: 'sber' as CharacterType,
  tabPage: 'Расписание' as TabsType,
  surface: 'sberbox' as SurfaceType,
  isEditMode: false,
  day: 'Понедельник' as DayType,
  isFetching: true,
  schedule: {
    'Понедельник': null,
    'Вторник': null,
    'Среда': null,
    'Четверг': null,
    'Пятница': null,
    'Суббота': null,
  } as ScheduleType,
  scheduleCopy: null as null | ScheduleType,
  homeTasks: [] as HomeTaskType[],
  showTaskMode: null as null | HomeTaskType,
  isAddTaskMode: false,
  isAddSubjectMode: false,
  changingSubject: null as SubjectType | null
}

export const reducer = (state: StateType, action: ActionsType): StateType => {
  switch (action.type) {
    case 'SET_CHARACTER':
      return { ...state, character: action.characterId }
    case 'CHANGE_DAY':
      return { ...state, day: action.day }
    case 'CHANGE_TAB':
      return { ...state, tabPage: action.tab }
    case 'ADD_SUBJECT':
      const returnObj = { ...state, schedule: { ...state.schedule } }
      returnObj.schedule[state.day] = state.schedule[state.day] !== null ?
        [...state.schedule[state.day] as SubjectType[], action.newSubject] :
        [action.newSubject]
      return returnObj
    case 'SET_SCHEDULE':
      return { ...state, schedule: action.schedule }
    case 'DELETE_SUBJECT': {
      const returnObj = { ...state, schedule: { ...state.schedule } }
      returnObj.schedule[state.day] = state.schedule[state.day]?.filter(subj => subj.id !== action.id) as SubjectType[]
      return returnObj
    }
    case 'DELETE_HOME_TASK':
      return { ...state, homeTasks: state.homeTasks.filter(task => task.id !== action.id) }
    case 'SET_USER_ID':
      return { ...state, userId: action.id }
    case 'SET_EDIT_MODE':
      return { ...state, isEditMode: action.flag, scheduleCopy: action.flag ? _.cloneDeep(state.schedule) : state.scheduleCopy}
    case 'SET_IS_DATA_FETCHING':
      return { ...state, isFetching: action.flag }
    case 'SET_SURFACE':
      return { ...state, surface: action.surface }
    case 'SET_HOME_TASKS':
      return { ...state, homeTasks: action.tasks.map(el => ({ ...el, date: new Date(el.date) })) }
    case 'ADD_HOME_TASK':
      return { ...state, homeTasks: [...state.homeTasks, { ...action.task, date: new Date(action.task.date) }] }
    case 'SET_IS_ADD_TASK_MODE':
      return { ...state, isAddTaskMode: action.flag }
    case 'SET_IS_ADD_SUBJECT_MODE':
      return { ...state, isAddSubjectMode: action.flag }
    case 'SET_TASK_MODE':
      return { ...state, showTaskMode: action.index !== null ? { ...state.homeTasks[action.index] } : null }
    case 'START_CHANGING_SUBJECT':
      return { ...state, changingSubject: {...state.schedule[state.day]?.find(item => item.id === action.id)} as SubjectType }
    case 'CHANGE_SUBJECT':
      const newSchedule = { ...state.schedule }
      newSchedule[state.day] = state.schedule[state.day]?.map(item => {
        if (item.id === action.subject.id) return action.subject
        else return item
      }) as SubjectType[]
      return {
        ...state,
        changingSubject: null,
        schedule: newSchedule
      }
    case 'RESET_SCHEDULE_COPY':
      return {
        ...state,
        schedule: _.cloneDeep(state.scheduleCopy ? state.scheduleCopy : state.schedule),
        scheduleCopy: null
      }
    default: return state
  }
}

export const actions = {
  setCharacter: (characterId: CharacterType) => ({ type: 'SET_CHARACTER', characterId } as const),
  changeDay: (day: DayType) => ({ type: 'CHANGE_DAY', day } as const),
  changeTab: (tab: TabsType) => ({ type: 'CHANGE_TAB', tab } as const),
  addSubject: (newSubject: SubjectType) => ({ type: 'ADD_SUBJECT', newSubject } as const),
  setSchedule: (schedule: ScheduleType) => ({ type: 'SET_SCHEDULE', schedule } as const),
  setUserId: (id: string) => ({ type: 'SET_USER_ID', id } as const),
  setEditMode: (flag: boolean) => ({ type: 'SET_EDIT_MODE', flag } as const),
  setIsFetching: (flag: boolean) => ({ type: 'SET_IS_DATA_FETCHING', flag } as const),
  deleteSubject: (id: string) => ({ type: 'DELETE_SUBJECT', id } as const),
  deleteHomeTask: (id: string) => ({ type: 'DELETE_HOME_TASK', id } as const),
  setSurface: (surface: SurfaceType) => ({ type: 'SET_SURFACE', surface } as const),
  setHomeTasks: (tasks: HomeTaskType[]) => ({ type: 'SET_HOME_TASKS', tasks } as const),
  addHomeTask: (task: HomeTaskType) => ({ type: 'ADD_HOME_TASK', task } as const),
  setShowTaskMode: (index: number | null) => ({ type: 'SET_TASK_MODE', index } as const),
  setIsAddTaskMode: (flag: boolean) => ({ type: 'SET_IS_ADD_TASK_MODE', flag } as const),
  resetScheduleCopy: () => ({ type: 'RESET_SCHEDULE_COPY' } as const),
  setIsAddSubjectMode: (flag: boolean) => ({ type: 'SET_IS_ADD_SUBJECT_MODE', flag } as const),
  startChangingSubject: (id: string) => ({ type: 'START_CHANGING_SUBJECT', id } as const),
  changeSubject: (subject: SubjectType) => ({ type: 'CHANGE_SUBJECT', subject } as const),
}
export const allSubjects = [
  { subject: 'Алгебра', subSubject: 'Алгебре', icon: '/algebra.png' as string },
  { subject: 'Астрономия', subSubject: 'Астрономии', icon: '/astron.png' as string },
  { subject: 'Русский язык', subSubject: 'Русскому языку', icon: '/russia.png' as string },
  { subject: 'Белорусский язык', subSubject: 'Белорусскому языку', icon: '/by.png' as string },
  { subject: 'Украинский язык', subSubject: 'Украинскому языку', icon: '/ukr.png' as string },
  { subject: 'Казахский язык', subSubject: 'Казахскому языку', icon: '/kazakhstan.png' as string },
  { subject: 'Английский язык', subSubject: 'Английскому языку', icon: '/english.png' as string },
  { subject: 'Немецкий язык', subSubject: 'Немецкому языку', icon: '/germany.png' as string },
  { subject: 'Французский язык', subSubject: 'Французскому языку', icon: '/franc.png' as string },
  { subject: 'Родной язык', subSubject: 'Родному языку', icon: '/books.png' as string },
  { subject: 'Биология', subSubject: 'Биологии', icon: '/biology.png' as string },
  { subject: 'Всемирная история', subSubject: 'Всемирной истории', icon: '/history.png' as string },
  { subject: 'География', subSubject: 'Географии', icon: '/earth.png' as string },
  { subject: 'Геометрия', subSubject: 'Геометрии', icon: '/geometry.png' as string },
  { subject: 'Естествознание', subSubject: 'Естествознанию', icon: '/tree.png' as string },
  { subject: 'Зарубежная литература', subSubject: 'Зарубежной литературе', icon: '/books.png' as string },
  { subject: 'Зарубежный язык', subSubject: 'Зарубежному языку', icon: '/books.png' as string },
  { subject: 'Информатика', subSubject: 'Информатике', icon: '/it.png' as string },
  { subject: 'Искусство', subSubject: 'Искусству', icon: '/art.png' as string },
  { subject: 'История', subSubject: 'Истории', icon: '/history.png' as string },
  { subject: 'Классный час', subSubject: 'Классному часу', icon: '/time.png' as string },
  { subject: 'Математика', subSubject: 'Математике', icon: '/algebra.png' as string },
  { subject: 'Мировая художественная культура', subSubject: 'Мировой художественной культуре', icon: '/books.png' as string },
  { subject: 'Музыка (пение)', subSubject: 'Музыке (пению)', icon: '/music.png' as string },
  { subject: 'Начальная военная подготовка', subSubject: 'Начальной военной подготовке', icon: '/army.png' as string },
  { subject: 'Обществознание', subSubject: 'Обществознанию', icon: '/society.png' as string },
  { subject: 'Основы безопасности жизнедеятельности', subSubject: 'Основам безопасности жизнедеятельности', icon: '/family.png' as string },
  { subject: 'Основы экономики', subSubject: 'Основам экономики', icon: '/economy.png' as string },
  { subject: 'Правоведение', subSubject: 'Правоведению', icon: '/pravo.png' as string },
  { subject: 'Природоведение', subSubject: 'Природоведению', icon: '/tree.png' as string },
  { subject: 'Рисование', subSubject: 'Рисованию', icon: '/art.png' as string },
  { subject: 'Родная литература', subSubject: 'Родной литературе', icon: '/books.png' as string },
  { subject: 'Технология', subSubject: 'Технологии', icon: '/hammer.png' as string },
  { subject: 'Труд', subSubject: 'Труду', icon: '/hammer.png' as string },
  { subject: 'Физика', subSubject: 'Физике', icon: '/biology.png' as string },
  { subject: 'Физкультура', subSubject: 'Физкультуре', icon: '/ball.png' as string },
  { subject: 'Философия', subSubject: 'Философии', icon: '/books.png' as string },
  { subject: 'Химия', subSubject: 'Химии', icon: '/chemistry.png' as string },
  { subject: 'Хореография', subSubject: 'Хореографии', icon: '/choreography.png' as string },
  { subject: 'Черчение', subSubject: 'Черчению', icon: '/drawing.png' as string },
  { subject: 'Чтение', subSubject: 'Чтению', icon: '/books.png' as string },
  { subject: 'Экология', subSubject: 'Экологии', icon: '/ecology.png' as string },
] as const
export const daysArray = [
  ['Понедельник', 'Пн'],
  ['Вторник', 'Вт'],
  ['Среда', 'Ср'],
  ['Четверг', 'Чт'],
  ['Пятница', 'Пт'],
  ['Суббота', 'Сб'],
] as const
export const dateDaysArray = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
] as const
export const monthsArray = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
] as const

type InferActionType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
type InferSubjectType<T> = T extends { subject: infer U } ? U : never
type InferSubSubjectType<T> = T extends { subSubject: infer U } ? U : never
export type ActionsType = InferActionType<typeof actions>
export type StateType = typeof initialState
export type TabsType = 'Расписание' | 'Домашка'
export type DayType = 'Понедельник' | 'Вторник' | 'Среда' | 'Четверг' | 'Пятница' | 'Суббота'
export type SubjectConstType = InferSubjectType<typeof allSubjects[number]>
export type SubSubjectConstType = InferSubSubjectType<typeof allSubjects[number]>
export type SubjectWithIconsType = typeof allSubjects[number]
export type SubjectType = {
  subject: SubjectConstType
  icon: string
  teacher: string | null
  cabinet: string | null
  id: string
}
export type ScheduleType = {
  'Понедельник': null | SubjectType[],
  'Вторник': null | SubjectType[],
  'Среда': null | SubjectType[],
  'Четверг': null | SubjectType[],
  'Пятница': null | SubjectType[],
  'Суббота': null | SubjectType[],
}
export type SurfaceType = 'sberbox' | 'mobile'
export type HomeTaskType = {
  subject: SubjectConstType
  subSubject: SubSubjectConstType
  date: Date
  task: string
  icon: string
  id: string
}