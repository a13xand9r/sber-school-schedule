import { CharacterType } from './GlobalStyle'
import _ from 'lodash'
import { ActionsType, DayType, HomeTaskType, ScheduleType, StateType, SubjectType, SurfaceType, TabsType } from './src/types'

export const initialState = {
  userId: null as null | string,
  character: 'sber' as CharacterType,
  tabPage: 'Расписание' as TabsType,
  surface: 'sberBox' as SurfaceType,
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
      return { ...state, showTaskMode: action.id ? { ...state.homeTasks.find(item => item.id === action.id) as HomeTaskType } : null }
    case 'START_CHANGING_SUBJECT':
      return { ...state, changingSubject: {...state.schedule[state.day]?.find(item => item.id === action.id)} as SubjectType }
    case 'FINISH_CHANGING_SUBJECT':
      return { ...state, changingSubject: null }
    case 'CHANGE_SUBJECT':
      const newSchedule = { ...state.schedule }
      newSchedule[state.day] = state.schedule[state.day]?.map(item => {
        if (item.id === action.subject.id) return action.subject
        else return item
      }) as SubjectType[]
      return {
        ...state,
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
  setShowTaskMode: (id: string | null) => ({ type: 'SET_TASK_MODE', id } as const),
  setIsAddTaskMode: (flag: boolean) => ({ type: 'SET_IS_ADD_TASK_MODE', flag } as const),
  resetScheduleCopy: () => ({ type: 'RESET_SCHEDULE_COPY' } as const),
  setIsAddSubjectMode: (flag: boolean) => ({ type: 'SET_IS_ADD_SUBJECT_MODE', flag } as const),
  startChangingSubject: (id: string) => ({ type: 'START_CHANGING_SUBJECT', id } as const),
  changeSubject: (subject: SubjectType) => ({ type: 'CHANGE_SUBJECT', subject } as const),
  finishChangingSubject: () => ({ type: 'FINISH_CHANGING_SUBJECT' } as const),
}

