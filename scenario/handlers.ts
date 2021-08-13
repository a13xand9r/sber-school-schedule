import { SaluteHandler } from '@salutejs/scenario'
import { start } from './dataBase'

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