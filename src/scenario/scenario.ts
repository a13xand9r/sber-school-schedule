import { SmartAppBrainRecognizer } from '@salutejs/recognizer-smartapp-brain'
import { createIntents, createMatchers, createSaluteRequest, createSaluteResponse, createScenarioWalker, createSystemScenario, createUserScenario, NLPRequest, NLPResponse, SaluteRequest } from '@salutejs/scenario'
import { SaluteMemoryStorage } from '@salutejs/storage-adapter-memory'
import { getDailyScheduleHandler, noMatchHandler, runAppHandler } from './handlers'
import model from '../intents.json'

const storage = new SaluteMemoryStorage()
const intents = createIntents(model.intents)
const { action, regexp, intent, text } = createMatchers<SaluteRequest, typeof intents>()

const userScenario = createUserScenario({
  getDailySchedule: {
    match: intent('/Расписание на день', {confidence: 0.2}),
    handle: getDailyScheduleHandler
  },
  calc: {
    match: intent('/sum', {confidence: 0.2}),
    handle: ({req, res}) => {
      const {num1, num2} = req.variables
      res.appendBubble(`${+num1 + +num2}`)
    }
  },
  addHomeTask: {
    match: intent('/Новое дз', {confidence: 0.2}),
    handle: ({req, res}) => {
      console.log('variables:', req.variables)
      console.log('original_text:', req.message.original_text)
      console.log('normalized_text:', req.message.normalized_text)
      console.log('entities:', req.message.entities)
      console.log('tokenized_elements_list:', req.message.tokenized_elements_list)
      console.log('asr_normalized_message:', req.message.asr_normalized_message)
      console.log('human_normalized_text:', req.message.human_normalized_text)
    }
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