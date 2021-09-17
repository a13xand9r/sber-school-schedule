import { AssistantAppState } from '@sberdevices/assistant-client'
import { actions, initialState } from '../store'
import { allSubjects } from './utils/constants'

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

export interface AssistantState extends AssistantAppState {
  isEditMode: boolean
  tabPage: TabsType
  day: DayType
  schedule: ScheduleType
  isAddTaskMode: boolean
  isAddSubjectMode: boolean
  isShowTaskMode: boolean
}