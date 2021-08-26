import { DayType } from './../../store';
import { SaluteHandler, SaluteRequestVariable } from '@salutejs/scenario'
import { getSchedule, start } from './dataBase'
import * as dictionary from './system.i18n'

export const runAppHandler: SaluteHandler = ({ req, res, session }) => {
  res.appendCommand({
    type: 'SET_USER_ID',
    id: req.request.uuid.sub
  })
  res.setPronounceText('Здесь можно добавить, просматривать и редактировать свое расписание. А также добавлять домашние задания')
  res.appendBubble('Здесь можно добавить, просматривать и редактировать свое расписание. А также добавлять домашние задания')
}
export const noMatchHandler: SaluteHandler = ({ req, res }) => {
  const keyset = req.i18n(dictionary)
  res.appendBubble(keyset('404'))
  res.setPronounceText('Хм, не понимаю о чем вы')
}

export const addHomeTaskHandler: SaluteHandler = async ({ req, res }) => {
  const { date, subj } = req.variables
  const keyset = req.i18n(dictionary)
  res.appendBubble(keyset('newHomeTask'))
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
export const getDailyScheduleHandler: SaluteHandler = async ({ req, res }) => {
  const { day } = req.variables
  const dailySchedule = await getSchedule(req.request.uuid.sub)
  const dailyScheduleText = dailySchedule[normalizeSubjectWord(day as string) as DayType]?.map(el => el.subject).join(', ')
  res.appendCommand({
    type: 'CHANGE_DAY',
    day: normalizeSubjectWord(day as string)
  })
  if (dailyScheduleText) {
    res.setPronounceText(`В ${day} следующие уроки: ${dailyScheduleText}`)
    res.appendBubble(`${dailyScheduleText}`)
  } else {
    res.setPronounceText(`В ${day} нет уроков`)
    res.appendBubble(`В ${day} нет уроков`)
  }
}

function normalizeSubjectWord(str: string) {
  if (!str) return str
  const lastLetter = str[str.length - 1] === 'у' ? 'а' : str[str.length - 1]
  return str[0].toUpperCase() + str.slice(1, str.length - 1) + lastLetter
}