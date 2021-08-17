import { DayType } from './../../store';
import { SaluteHandler, SaluteRequestVariable } from '@salutejs/scenario'
import { getSchedule, start } from './dataBase'

export const runAppHandler: SaluteHandler = ({ req, res, session }) => {
  res.appendCommand({
    type: 'SET_USER_ID',
    id: req.request.uuid.sub
  })
  res.setPronounceText('начнем')
  res.appendBubble('Посмотри свое расписание')
}
export const noMatchHandler: SaluteHandler = ({ res }) => {
  res.setPronounceText('Хм, не понимаю о чем вы')
  res.appendBubble('непонятное что-то')
}
export const getDailyScheduleHandler: SaluteHandler = async ({ req, res }) => {
  const {day} = req.variables
  console.log(day)
  
  const dailySchedule = await getSchedule(req.request.uuid.sub)
  //@ts-ignore
  const dailyScheduleText = dailySchedule[day]?.map(el => el.subject).join(', ')
  console.log('day response: ', dailyScheduleText)
  res.appendCommand({
    type: 'CHANGE_DAY',
    day
  })
  res.setPronounceText(`В ${day} следующие уроки: ${dailyScheduleText}`)
  res.appendBubble(`${dailyScheduleText}`)
}