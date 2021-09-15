import { AssistantState } from './../../pages/index';
import { DayType } from './../../store';
import { SaluteHandler } from '@salutejs/scenario'
import { getSchedule } from './dataBase'
import * as dictionary from './system.i18n'
import { getRandomFromArray } from '../utils/utils';

export const runAppHandler: SaluteHandler = ({ req, res }) => {
  res.appendCommand({
    type: 'SET_USER_ID',
    id: req.request.uuid.sub
  })
  if (req.request.payload.device?.surface === 'SBERBOX' && process.env.NODE_ENV === 'production'){
    res.setPronounceText('Здесь можно, просматривать свое расписание и домашние задания, редактировать их можно в приложении Салют или на СберПортале')
    res.appendBubble('Здесь можно, просматривать свое расписание и домашние задания, редактировать их можно в приложении Салют или на СберПортале')
  } else{
    res.setPronounceText('Здесь можно добавить, просматривать и редактировать свое расписание. А также добавлять домашние задания')
    res.appendBubble('Здесь можно добавить, просматривать и редактировать свое расписание. А также добавлять домашние задания')
  }
}
export const noMatchHandler: SaluteHandler = ({ req, res }) => {
  const keyset = req.i18n(dictionary)
  res.appendBubble(keyset('404'))
  res.setPronounceText('Хм, не понимаю о чем вы')
}

export const addHomeTaskHandler: SaluteHandler = async ({ req, res }) => {
  const { date, subj } = req.variables
  const keyset = req.i18n(dictionary)
  if (req.request.payload.device?.surface === 'SBERBOX' && process.env.NODE_ENV === 'production'){
    res.setPronounceText('Добавить домашнее задание можно в приложении Салют или на СберПортале')
    res.appendBubble('Добавить домашнее задание можно в приложении Салют или на СберПортале')
  } else {
    res.appendCommand({
      type: 'CHANGE_TAB',
      tab: 'Домашка'
    })
    res.appendCommand({
      type: 'SET_IS_ADD_TASK_MODE',
      flag: true
    })
    res.setPronounceText(keyset('newHomeTask'))
    res.appendBubble(keyset('newHomeTask'))
  }
}
export const getDailyScheduleHandler: SaluteHandler = async ({ req, res }) => {
  const day = JSON.parse(req.variables.day as string) as DayBrainType
  const dailySchedule = await getSchedule(req.request.uuid.sub)
  const dailyScheduleText = dailySchedule[day.name as DayType]?.map(el => el.subject).join(', ')
  res.appendCommand({
    type: 'CHANGE_TAB',
    tab: 'Расписание'
  })
  res.appendCommand({
    type: 'CHANGE_DAY',
    day: day.name
  })
  if (dailyScheduleText) {
    res.setPronounceText(`${day.name === 'Вторник' ? 'Во' : 'В'} ${day.subName.toLowerCase()} следующие уроки. ${dailyScheduleText}`)
    res.appendBubble(`${dailyScheduleText}`)
  } else {
    res.setPronounceText(`${day.name === 'Вторник' ? 'Во' : 'В'} ${day.subName.toLowerCase()} нет уроков`)
    res.appendBubble(`${day.name === 'Вторник' ? 'Во' : 'В'} ${day.subName.toLowerCase()} нет уроков`)
  }
}
export const homeTaskDoneHandler: SaluteHandler = ({req, res}) => {
  res.setPronounceText('Домашнее задание выполнено. Молодец!')
}
export const homeTasksNavigationHandler: SaluteHandler = ({req, res}) => {
  res.appendCommand({
    type: 'CHANGE_TAB',
    tab: 'Домашка'
  })
  const keyset = req.i18n(dictionary)
  res.appendBubble(keyset('homeTasks'))
  res.setPronounceText(keyset('homeTasks'))
}
export const scheduleNavigationHandler: SaluteHandler = ({req, res}) => {
  res.appendCommand({
    type: 'CHANGE_TAB',
    tab: 'Расписание'
  })
  const keyset = req.i18n(dictionary)
  res.appendBubble(keyset('schedule'))
  res.setPronounceText(keyset('schedule'))
}
export const saveScheduleHandler: SaluteHandler = ({ res }) => {
  res.appendCommand({
    type: 'SAVE_SCHEDULE',
  })
  const answerArray = ['Готово', 'Сохранено']
  res.setPronounceText(getRandomFromArray(answerArray))
}

export const deleteSubjectHandler: SaluteHandler = ({req, res}) => {
  const state = req.state as AssistantState
  const subject = JSON.parse(req.variables.subject as string).name

  const subjectInDaySchedule = state.schedule[state.day]?.find(el => el.subject === subject)
  if (subjectInDaySchedule){
    res.appendCommand({
      type: 'DELETE_SUBJECT',
      id: subjectInDaySchedule.id
    })
    const answerArray = ['Готово', 'Удалено']
    res.setPronounceText(getRandomFromArray(answerArray))
  } else {
    res.setPronounceText('Такого предмета нет в этот день')
  }
}

function normalizeDayWord(str: string) {
  if (!str) return str
  const lastLetter = str[str.length - 1] === 'у' ? 'а' : str[str.length - 1]
  return str[0].toUpperCase() + str.slice(1, str.length - 1) + lastLetter
}

type DayBrainType = {
  name: string
  subName: string
}