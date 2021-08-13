// import fs from 'fs'
const fs = require('fs')
import scheduleData from '../scheduleData.json'
import { ScheduleType } from '../store'

export const writeJSON = (usersData: Array<UserSchedule>) => {
  let data = JSON.stringify(usersData)
  fs.writeFile('scheduleData.json', data, (err: any) => {
    if (err) {
      throw err
    }
    console.log("JSON data is saved.")
  })
}

export const getSchedule = (userId: string): ScheduleType => {
  const user = scheduleData.find(u => u.userId === userId)
  if (user) {
     //@ts-ignore
    return user.schedule
  } else return {
      'Понедельник': null,
      'Вторник': null,
      'Среда': null,
      'Четверг': null,
      'Пятница': null,
      'Суббота': null,
  }
}
export const changeSchedule = (userId: string, newSchedule: ScheduleType): ScheduleType => {
  const userIndex = scheduleData.findIndex(u => u.userId === userId)
  if (userIndex === -1){
     //@ts-ignore
    writeJSON([...scheduleData, {
      userId,
       //@ts-ignore
      schedule: newSchedule
    }])
  } else {
    const changedSchedule = scheduleData
    //@ts-ignore
    changedSchedule[userIndex].schedule = newSchedule
     //@ts-ignore
    writeJSON(changedSchedule)
  }
  return newSchedule
}


type UserSchedule = {
  userId: string
  schedule: ScheduleType
}