import { MongoClient } from 'mongodb'
import { ScheduleType } from '../store'

const client = new MongoClient('mongodb+srv://school_schedule:123qwerty@cluster0.siwn0.mongodb.net/schedule')
let isMongoConnected = false
export const start = async () => {
  try {
    await client.connect()
    isMongoConnected = true
    console.log('MongoDB connected')
  } catch (err) {
    console.log(err)
  }
}

const scheduleDB = client.db().collection('schedule')
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
    if (!isMongoConnected) await client.connect()
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
  const user = await scheduleDB.findOne({ userId })
  try {
    if (!isMongoConnected) await client.connect()
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