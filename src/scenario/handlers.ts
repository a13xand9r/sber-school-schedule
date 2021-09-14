import { DayType } from './../../store';
import { SaluteHandler, SaluteRequestVariable } from '@salutejs/scenario'
import { getSchedule, start } from './dataBase'
import * as dictionary from './system.i18n'

export const runAppHandler: SaluteHandler = ({ req, res }) => {
  res.appendCommand({
    type: 'SET_USER_ID',
    id: req.request.uuid.sub
  })
  if (req.request.payload.device?.surface === 'SBERBOX'){
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
  const { day } = req.variables
  const dailySchedule = await getSchedule(req.request.uuid.sub)
  const dailyScheduleText = dailySchedule[normalizeDayWord(day as string) as DayType]?.map(el => el.subject).join(', ')
  res.appendCommand({
    type: 'CHANGE_TAB',
    tab: ''
  })
  res.appendCommand({
    type: 'CHANGE_DAY',
    day: normalizeDayWord(day as string)
  })
  if (dailyScheduleText) {
    res.setPronounceText(`В ${day} следующие уроки: ${dailyScheduleText}`)
    res.appendBubble(`${dailyScheduleText}`)
  } else {
    res.setPronounceText(`В ${day} нет уроков`)
    res.appendBubble(`В ${day} нет уроков`)
  }
}
export const homeTaskDoneHandler: SaluteHandler = ({req, res}) => {
  res.setPronounceText('Домашнее задание выполнено. Молодец!')
}

function normalizeDayWord(str: string) {
  if (!str) return str
  const lastLetter = str[str.length - 1] === 'у' ? 'а' : str[str.length - 1]
  return str[0].toUpperCase() + str.slice(1, str.length - 1) + lastLetter
}