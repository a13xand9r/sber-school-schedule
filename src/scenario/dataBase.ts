import { MongoClient } from 'mongodb'
import { HomeTaskType, ScheduleType } from '../../store'

const client = new MongoClient('mongodb+srv://school_schedule:123qwerty@cluster0.siwn0.mongodb.net/schedule')
let scheduleDB: any
let homeTaskDB: any
let isMongoConnected = false
export const start = async () => {
  try {
    await client.connect()
    isMongoConnected = true
    console.log('MongoDB connected')
    scheduleDB = client.db().collection('schedule')
    homeTaskDB = client.db().collection('homeTask')
  } catch (err) {
    console.log(err)
  }
}

const emptySchedule = {
  'Понедельник': null,
  'Вторник': null,
  'Среда': null,
  'Четверг': null,
  'Пятница': null,
  'Суббота': null,
}

export const getSchedule = async (userId: string): Promise<ScheduleType> => {
  try {
    if (!isMongoConnected){
      await client.connect()
      scheduleDB = client.db().collection('schedule')
    }
    const user = await scheduleDB.findOne({ userId })
    console.log('user: ', user)
    if (user) {
      return user.schedule
    } else {
      return emptySchedule
    }
  } catch (err) {
    console.log('mongoDB error: ', err)
    return emptySchedule
  }
}

export const changeSchedule = async (userId: string, newSchedule: ScheduleType): Promise<ScheduleType> => {
  try {
    if (!isMongoConnected){
      await client.connect()
      scheduleDB = client.db().collection('schedule')
    }
    const user = await scheduleDB.findOne({ userId })
    if (user) {
      await scheduleDB.updateOne({ userId }, {
        $set: { userId, schedule: newSchedule }
      })
    } else {
      scheduleDB.insertOne({ userId, schedule: newSchedule })
    }
    return newSchedule
  } catch (err) {
    console.log('mongoDB error: ', err)
    return emptySchedule
  }
}

export const getHomeTasks = async (userId: string): Promise<HomeTaskType[]> => {
  try {
    if (!isMongoConnected){
      await client.connect()
      homeTaskDB = client.db().collection('homeTasks')
    }
    const user = await homeTaskDB.findOne({ userId })
    if (user) {
      return user.homeTasks
    } else {
      return []
    }
  } catch (err) {
    console.log('mongoDB error: ', err)
    return []
  }
}

export const addHomeTask = async (userId: string, newHomeTask: HomeTaskType): Promise<HomeTaskType | null> => {
  try {
    if (!isMongoConnected){
      await client.connect()
      homeTaskDB = client.db().collection('homeTasks')
    }
    const user = await homeTaskDB.findOne({ userId })
    if (user) {
      await homeTaskDB.updateOne({ userId }, {
        $set: { userId, homeTasks: [...user.homeTasks, newHomeTask] }
      })
    } else {
      homeTaskDB.insertOne({ userId, homeTasks: [newHomeTask] })
    }
    return newHomeTask
  } catch (err) {
    console.log('mongoDB error: ', err)
    return null
  }
}