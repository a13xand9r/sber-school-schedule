import { createSmartappDebugger, createAssistant } from '@sberdevices/assistant-client'
import { Dispatch } from 'react'
import { actions } from '../../store'
import { AssistantState } from '../types'

export const initializeAssistant = (getState: () => AssistantState) => {
  if (process.env.NODE_ENV === 'development') {
    return createSmartappDebugger({
      token: process.env.NEXT_PUBLIC_ASSISTANT_TOKEN ?? '',
      initPhrase: 'Запусти школьное расписание',
      getState
    })
  }
  return createAssistant({ getState })
}

export const initAssistant = (
  dispatch: Dispatch<any>,
  assistant: ReturnType<typeof createAssistant>,
  assistantState: AssistantState,
  saveData: () => void
  ) => {
  assistant.on('data', ({ smart_app_data, type, character }: any) => {
    if (smart_app_data) {
      dispatch(smart_app_data)
      if (smart_app_data.type === 'SAVE_SCHEDULE') saveData()
    }
    if (type === 'character') dispatch(actions.setCharacter(character.id))
  })
  const detectDeviceCallback = () => (
    window.navigator.userAgent.toLowerCase().includes('sberbox') ? 'sberbox' : 'mobile'
  )
  dispatch(actions.setSurface(detectDeviceCallback()))
}