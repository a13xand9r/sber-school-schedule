// import fs from 'fs'
const fs = require('fs')
import scheduleData from '../scheduleData.json'
import { SubjectType } from '../store'

export const writeJSON = (usersData: Array<UserSchedule>) => {
  let data = JSON.stringify(usersData)
  console.log('read: ', scheduleData)
  // fs.writeFileSync('scheduleData.json', data, (err: any) => {
  //   if (err){
  //     throw err
  //   }
  //   console.log("JSON data is saved.")
  // })
  fs.writeFile('scheduleData.json', data, (err: any) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  })
}

export const changeSchedule = (id: string) => {
  // const user = scheduleData.find(u => u.id === id)
  const newSchedule = [...scheduleData, {
    id, schedule: {
      'Понедельник': null,
      'Вторник': null,
      'Среда': null,
      'Четверг': null,
      'Пятница': null,
      'Суббота': null,
    }
  }]
  writeJSON(newSchedule)
}


type UserSchedule = {
  id: string
  schedule: {
    'Понедельник': null | SubjectType[],
    'Вторник': null | SubjectType[],
    'Среда': null | SubjectType[],
    'Четверг': null | SubjectType[],
    'Пятница': null | SubjectType[],
    'Суббота': null | SubjectType[],
  }
}