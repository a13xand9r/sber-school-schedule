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
export const noMatchHandler: SaluteHandler = ({ req, res }) => {
  console.log('noMatch:',req.message.original_text)
  res.setPronounceText('Хм, не понимаю о чем вы')
  res.appendBubble('непонятное что-то')
}
export const getDailyScheduleHandler: SaluteHandler = async ({ req, res }) => {
  const { day } = req.variables
  const dailySchedule = await getSchedule(req.request.uuid.sub)
  const dailyScheduleText = dailySchedule[objectWord(day as string) as DayType]?.map(el => el.subject).join(', ')
  console.log('day: ', day)
  console.log('normalize_day: ', objectWord(day as string))
  res.appendCommand({
    type: 'CHANGE_DAY',
    day: objectWord(day as string)
  })
  if (dailyScheduleText) {
    res.setPronounceText(`В ${day} следующие уроки: ${dailyScheduleText}`)
    res.appendBubble(`${dailyScheduleText}`)
  } else {
    res.setPronounceText(`В ${day} нет уроков`)
    res.appendBubble(`В ${day} нет уроков`)
  }
}

function objectWord(str: string) {
  if (!str) return str
  const lastLetter = str[str.length-1] === 'у' ? 'а' : str[str.length-1]
  return str[0].toUpperCase() + str.slice(1, str.length-1) + lastLetter
}