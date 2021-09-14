import { SmartAppBrainRecognizer } from '@salutejs/recognizer-smartapp-brain'
import { createIntents, createMatchers, createSaluteRequest, createSaluteResponse, createScenarioWalker, createSystemScenario, createUserScenario, NLPRequest, NLPResponse, SaluteRequest } from '@salutejs/scenario'
import { SaluteMemoryStorage } from '@salutejs/storage-adapter-memory'
import { addHomeTaskHandler, getDailyScheduleHandler, homeTaskDoneHandler, noMatchHandler, runAppHandler } from './handlers'
import model from '../intents.json'

const storage = new SaluteMemoryStorage()
const intents = createIntents(model.intents)
const { action, regexp, intent, text, selectItem } = createMatchers<SaluteRequest, typeof intents>()

const userScenario = createUserScenario({
  getDailySchedule: {
    match: intent('/Расписание на день', {confidence: 0.2}),
    handle: getDailyScheduleHandler
  },
  homeTaskDone: {
    match: action('task_done'),
    handle: homeTaskDoneHandler
  },
  addHomeTask: {
    match: intent('/Новое дз', {confidence: 0.2}),
    handle: addHomeTaskHandler,
    // children: {
    //   taskText: {
    //     match: intent('/Новое дз/Текст дз', {confidence: 0.2}),
    //     handle: ({req, res}) => {
    //       console.log(req.variables)
    //       res.setPronounceText('Записано')
    //       res.appendBubble('Записано')
    //     }
    //   }
    // }
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