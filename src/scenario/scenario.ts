import { SmartAppBrainRecognizer } from '@salutejs/recognizer-smartapp-brain'
import { createIntents, createMatchers, createSaluteRequest, createSaluteResponse, createScenarioWalker, createSystemScenario, createUserScenario, NLPRequest, NLPResponse, SaluteRequest } from '@salutejs/scenario'
import { SaluteMemoryStorage } from '@salutejs/storage-adapter-memory'
import { addHomeTaskHandler, addHomeTaskTextHandler, addSubjectHandler, deleteSubjectHandler, getDailyScheduleHandler, homeTaskDoneHandler, homeTasksNavigationHandler, noMatchHandler, runAppHandler, saveHomeTaskHandler, saveScheduleHandler, scheduleNavigationHandler } from './handlers'
import model from '../intents.json'

const storage = new SaluteMemoryStorage()
const intents = createIntents(model.intents)
const { action, regexp, intent, text, selectItem, state, match } = createMatchers<SaluteRequest, typeof intents>()

const userScenario = createUserScenario({
  getDailySchedule: {
    match: intent('/Расписание на день', {confidence: 0.2}),
    handle: getDailyScheduleHandler
  },
  homeTaskDone: {
    match: action('task_done'),
    handle: homeTaskDoneHandler
  },
  homeTasksNavigation:{
    match: intent('/Дз', {confidence: 0.2}),
    handle: homeTasksNavigationHandler
  },
  scheduleNavigation:{
    match: intent('/Расписание', {confidence: 0.2}),
    handle: scheduleNavigationHandler
  },
  deleteSubject:{
    match: match(intent('/Удалить предмет', {confidence: 0.2}), (req) => req.state?.isEditMode as boolean),
    handle: deleteSubjectHandler
  },
  deleteSubjectNotFromEditMode:{
    match: match(intent('/Удалить предмет', {confidence: 0.2}), (req) => !req.state?.isEditMode as boolean),
    handle: ({ res }) => {
      res.setPronounceText('Для удаления предмета нужно перейти в режим редактирования')
    }
  },
  addSubject:{
    match: match(intent('/Добавить предмет', {confidence: 0.2}), (req) => req.state?.isEditMode as boolean),
    handle: addSubjectHandler
  },
  setEditMode:{
    match: match(intent('/Режим редактирования', {confidence: 0.2}), (req) => !req.state?.isEditMode as boolean),
    handle: ({ res }) => {
      res.appendCommand({
        type: 'SET_EDIT_MODE',
        flag: true
      })
    }
  },
  saveSchedule:{
    match: match(intent('/Сохранить', {confidence: 0.2}), (req) => req.state?.isEditMode as boolean),
    handle: saveScheduleHandler
  },
  addHomeTask: {
    match: intent('/Новое дз', {confidence: 0.2}),
    handle: addHomeTaskHandler,
    children: {
      taskText: {
        match: match((req) => !!req.message.original_text, (req) => req.state?.isAddTaskMode as boolean, (req) => {
          console.log('current state',req.currentState?.path[0])
          return req.currentState?.path[0] !== 'addHomeTask'
        }),
        handle: addHomeTaskTextHandler
      },
      yes:{
        match: intent('/Согласие', {confidence: 0.2}),
        handle: saveHomeTaskHandler
      },
      no:{
        match: intent('/Отрицание', {confidence: 0.2}),
        handle: ({res}) => {
          res.setPronounceText('Хорошо. Не буду.')
        }
      },
    }
  },
  saveHomeTask:{
    match: match(intent('/Сохранить', {confidence: 0.4}), (req) => req.state?.isAddTaskMode as boolean),
    handle: saveHomeTaskHandler
  },
})

const systemScenario = createSystemScenario({
  RUN_APP: runAppHandler,
  NO_MATCH: noMatchHandler
})

const scenarioWalker = createScenarioWalker({
  recognizer: new SmartAppBrainRecognizer(process.env.NEXT_PUBLIC_SMART_BRAIN),
  intents,
  systemScenario,
  userScenario
})

export const handleNlpRequest = async (request: NLPRequest): Promise<NLPResponse> => {
  const req = createSaluteRequest(request)
  const res = createSaluteResponse(request)
  const sessionId = request.uuid.userId
  const session = await storage.resolve(sessionId)
  await scenarioWalker({ req, res, session })

  await storage.save({ id: sessionId, session})

  return res.message
}