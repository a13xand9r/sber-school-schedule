import { MongoClient } from 'mongodb'
import { HomeTaskType, ScheduleType } from '../types'

const client = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_CLIENT ?? '')
let scheduleDB: any
let homeTasksDB: any
let isMongoConnected = false

export const start = async () => {
  try {
    console.log('Trying to connect mongoDB')
    await client.connect()
    isMongoConnected = true
    console.log('MongoDB connected')
    scheduleDB = client.db().collection('schedule')
    homeTasksDB = client.db().collection('homeTasks')
  } catch (err) {
    console.log('mongo connection error', err)
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
      await start()
      scheduleDB = client.db().collection('schedule')
    }
    const user = await scheduleDB.findOne({ userId })
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
      await start()
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
      await start()
      homeTasksDB = client.db().collection('homeTasks')
    }
    const user = await homeTasksDB.findOne({ userId })
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
      await start()
      homeTasksDB = client.db().collection('homeTasks')
    }
    const user = await homeTasksDB.findOne({ userId })
    if (user) {
      await homeTasksDB.updateOne({ userId }, {
        $set: { userId, homeTasks: [...user.homeTasks, newHomeTask] }
      })
    } else {
      homeTasksDB.insertOne({ userId, homeTasks: [newHomeTask] })
    }
    return newHomeTask
  } catch (err) {
    console.log('mongoDB error: ', err)
    return null
  }
}
export const deleteHomeTask = async (userId: string, itemId: string): Promise<HomeTaskType | null> => {
  try {
    if (!isMongoConnected){
      await client.connect()
      homeTasksDB = client.db().collection('homeTasks')
    }
    const user = await homeTasksDB.findOne({ userId })
    const newHomeTasks = user.homeTasks.filter((task: HomeTaskType) => task.id !== itemId)
    if (user) {
      await homeTasksDB.updateOne({ userId }, {
        $set: { userId, homeTasks: newHomeTasks }
      })
    }
    return newHomeTasks
  } catch (err) {
    console.log('mongoDB error: ', err)
    return null
  }
}