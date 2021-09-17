import { SaluteHandler } from '@salutejs/scenario'
import * as dictionary from './system.i18n'
import {capitalizeFirstLetter, getRandomFromArray } from '../utils/utils'
import { AssistantState, DayType, ScheduleType } from '../types'
import { buttons } from '../utils/constants'

export const runAppHandler: SaluteHandler = ({ req, res }) => {
  res.appendCommand({
    type: 'SET_USER_ID',
    id: req.request.uuid.sub
  })
  if (req.request.payload.device?.surface === 'SBERBOX' && process.env.NODE_ENV === 'production'){
    res.setPronounceText('Здесь можно просматривать свое расписание и домашние задания, редактировать их можно в приложении Салют или на СберПортале.')
    res.appendBubble('Здесь можно просматривать свое расписание и домашние задания, редактировать их можно в приложении Салют или на СберПортале.')
  } else{
    res.setPronounceText('Здесь можно добавлять, просматривать и редактировать свое расписание. А также добавлять домашние задания.')
    res.appendBubble('Здесь можно добавлять, просматривать и редактировать свое расписание. А также добавлять домашние задания.')
  }
}

export const changeTabPageHandler: SaluteHandler = ({req, res}, dispatch) => {
  //@ts-ignore
  if(req.serverAction?.payload.tabPage === 'Расписание'){
    res.appendSuggestions([getRandomFromArray(buttons.schedulePage)])
  } else{
    dispatch && req.state?.isAddTaskMode && dispatch(['addHomeTask'])
    if (req.request.payload.device?.surface === 'SBERBOX' && process.env.NODE_ENV === 'production'){
      res.appendSuggestions([getRandomFromArray(buttons.generalSberBox)])
    } else{
      res.appendSuggestions([getRandomFromArray(buttons.general)])
    }
  }
}

export const changeIsEditModeHandler: SaluteHandler = ({req, res}) => {
  //@ts-ignore
  if(req.serverAction?.payload.isEditMode === true){
    res.appendSuggestions([getRandomFromArray(buttons.schedulePageEditMode)])
  } else {
    res.appendSuggestions([getRandomFromArray(buttons.schedulePage)])
  }
}

export const noMatchHandler: SaluteHandler = ({ req, res }) => {
  const keyset = req.i18n(dictionary)
  res.setPronounceText(keyset('404'))
  res.appendSuggestions([getRandomFromArray(buttons.general)])
}

export const addHomeTaskHandler: SaluteHandler = async ({ req, res }) => {
  const subject = req.variables.subject ? JSON.parse(req.variables.subject as string).name : ''
  const timestamp = req.variables.date ? JSON.parse(req.variables.date as string).timestamp : null
  const keyset = req.i18n(dictionary)
  if (req.request.payload.device?.surface === 'SBERBOX' && process.env.NODE_ENV === 'production'){
    res.setPronounceText('Добавить домашнее задание можно в приложении Салют или на СберПортале')
    res.appendBubble('Добавить домашнее задание можно в приложении Салют или на СберПортале')
  } else {
    res.appendCommand({
      type: 'SET_IS_ADD_TASK_MODE',
      flag: true
    })
    res.appendCommand({
      type: 'CHANGE_TAB',
      tab: 'Домашка'
    })
    res.appendCommand({
      type: 'SET_TASK_MODE',
      index: null
    })
    if (subject){
      res.appendCommand({
        type: 'ADD_SUBJECT_FORM',
        subject
      })
    }
    if (timestamp){
      res.appendCommand({
        type: 'SET_DATE_FORM',
        timestamp
      })
    }
    if (req.state?.tabPage === 'Домашка'){
      res.setPronounceText(keyset('newHomeTask'))
      res.setAutoListening(true)
    }
  }
}

export const getDailyScheduleHandler: SaluteHandler = ({ req, res }) => {
  const day = JSON.parse(req.variables.day as string) as DayBrainType
  const dailySchedule = req.state?.schedule as ScheduleType
  const dailyScheduleText = dailySchedule[day.name as DayType]?.map(el => el.subject).join(', ')
  res.appendCommand({
    type: 'CHANGE_TAB',
    tab: 'Расписание'
  })
  res.appendCommand({
    type: 'CHANGE_DAY',
    day: day.name
  })
  if (dailyScheduleText) {
    res.setPronounceText(`${day.name === 'Вторник' ? 'Во' : 'В'} ${day.subName.toLowerCase()} следующие уроки. ${dailyScheduleText}`)
    res.appendBubble(`${dailyScheduleText}`)
  } else {
    res.setPronounceText(`${day.name === 'Вторник' ? 'Во' : 'В'} ${day.subName.toLowerCase()} нет уроков`)
    res.appendBubble(`${day.name === 'Вторник' ? 'Во' : 'В'} ${day.subName.toLowerCase()} нет уроков`)
  }
  res.appendSuggestions([getRandomFromArray(buttons.schedulePage)])
}

export const homeTaskDoneHandler: SaluteHandler = ({req, res}) => {
  const text = ['Домашнее задание выполнено. Молодец!', 'Готово!', 'Молодец!', 'Выполнено!', 'Сделано!']
  res.appendBubble(getRandomFromArray(text))
}

export const setHomeTaskDoneHandler: SaluteHandler = ({req, res}) => {
  res.appendCommand({
    type: 'ASSISTANT_SET_HOME_TASK_DONE',
    //@ts-ignore
    id: req.state?.showTaskMode.id
  })
}
export const deleteHomeTaskHandler: SaluteHandler = ({req, res}) => {
  res.appendCommand({
    type: 'ASSISTANT_DELETE_HOME_TASK',
    //@ts-ignore
    id: req.state?.showTaskMode.id
  })
}

export const addHomeTaskTextHandler: SaluteHandler = ({req, res}) => {
  const text = req.message.tokenized_elements_list.map((word, i) => {
    if (i === 0 || !!word.composite_token_type) return capitalizeFirstLetter(word.text)
    return word.text
  }).join(' ')
  console.log(req.message.tokenized_elements_list)
  res.appendCommand({
    type: 'SET_HOME_TASK_TEXT_FORM',
    text: text
  })
  res.setPronounceText('Добавить?')
  res.setAutoListening(true)
  res.appendSuggestions(['Да', 'Нет'])
}

export const homeTasksNavigationHandler: SaluteHandler = ({req, res}) => {
  res.appendCommand({
    type: 'CHANGE_TAB',
    tab: 'Домашка'
  })
  const keyset = req.i18n(dictionary)
  res.appendBubble(keyset('homeTasks'))
  res.setPronounceText(keyset('homeTasks'))
}

export const scheduleNavigationHandler: SaluteHandler = ({req, res}) => {
  res.appendCommand({
    type: 'CHANGE_TAB',
    tab: 'Расписание'
  })
  const keyset = req.i18n(dictionary)
  res.appendBubble(keyset('schedule'))
  res.setPronounceText(keyset('schedule'))
}

export const saveScheduleHandler: SaluteHandler = ({ res }) => {
  res.appendCommand({
    type: 'SAVE_SCHEDULE',
  })
  const answerArray = ['Готово', 'Сохранено']
  res.setPronounceText(getRandomFromArray(answerArray))
}

export const saveHomeTaskHandler: SaluteHandler = ({ res }) => {
  res.appendCommand({
    type: 'SAVE_HOME_TASK_FROM',
  })
  // const answerArray = ['Готово', 'Сохранено', 'Добавлено']
  // res.setPronounceText(getRandomFromArray(answerArray))
  res.appendSuggestions([getRandomFromArray(buttons.general)])
}

export const addSubjectHandler: SaluteHandler = ({ req, res }) => {
  let subject: string = ''
  try{
    subject = JSON.parse(req.variables.subject as string).name
  }catch(e){}
  res.appendCommand({
    type: 'SET_IS_ADD_SUBJECT_MODE',
    flag: true
  })
  const keyset = req.i18n(dictionary)
  if (subject) {
    res.appendCommand({
      type: 'ADD_SUBJECT_FORM',
      subject: subject
    })
    res.setPronounceText(keyset('good'))
  } else {
    res.setPronounceText(keyset('letsAddSubject'))
  }
}

export const deleteSubjectHandler: SaluteHandler = ({req, res}) => {
  const state = req.state as AssistantState
  const subject = JSON.parse(req.variables.subject as string).name

  const subjectInDaySchedule = state.schedule[state.day]?.find(el => el.subject === subject)
  if (subjectInDaySchedule){
    res.appendCommand({
      type: 'DELETE_SUBJECT',
      id: subjectInDaySchedule.id
    })
    const answerArray = ['Готово', 'Удалено']
    res.setPronounceText(getRandomFromArray(answerArray))
  } else {
    res.setPronounceText('Такого предмета нет в этот день')
  }
}

type DayBrainType = {
  name: string
  subName: string
}