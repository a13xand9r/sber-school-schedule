import { SaluteHandler } from '@salutejs/scenario'

export let userId: string | null = null

export const runAppHandler: SaluteHandler = ({ req, res, session }) => {
  userId = req.request.uuid.sub
  console.log('req.user: ', req.request.uuid.sub)
  session.userId = req.request.uuid.sub
  res.appendCommand({
    type: 'SET_USER_ID',
    id: req.request.uuid.sub
  })
  // res.appendSuggestions([''])
  res.setPronounceText('начнем')
  res.appendBubble('Посмотри свое расписание')
}
export const noMatchHandler: SaluteHandler = ({ res }) => {
  // res.appendSuggestions(['как приготовить коктейль стеклянная весна?'])
  res.setPronounceText('Хм, не понимаю о чем вы')
  res.appendBubble('непонятное что-то')
}