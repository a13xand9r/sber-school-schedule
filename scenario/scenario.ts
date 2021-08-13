import { SmartAppBrainRecognizer } from '@salutejs/recognizer-smartapp-brain'
import { createSaluteRequest, createSaluteResponse, createScenarioWalker, createSystemScenario, NLPRequest, NLPResponse } from '@salutejs/scenario'
import { SaluteMemoryStorage } from '@salutejs/storage-adapter-memory'


const storage = new SaluteMemoryStorage()

const systemScenario = createSystemScenario({
  RUN_APP: () => {},
  NO_MATCH: () => {}
})

const scenarioWalker = createScenarioWalker({
  recognizer: new SmartAppBrainRecognizer(process.env.NEXT_PUBLIC_SMART_BRAIN),
  systemScenario
})

export const handleNlpRequest = async (request: NLPRequest): Promise<NLPResponse> => {
  const req = createSaluteRequest(request)
  const res = createSaluteResponse(request)
  console.log(req.message.normalized_text)
  console.log(req.message.original_text, req.systemIntent)
  const sessionId = request.uuid.userId
  const session = await storage.resolve(sessionId)
  await scenarioWalker({ req, res, session })

  await storage.save({ id: sessionId, session })

  return res.message
}