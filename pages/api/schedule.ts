import { ScheduleType } from './../../store';
import { changeSchedule, getSchedule, start } from '../../src/scenario/dataBase';
import type { NextApiRequest, NextApiResponse } from 'next'

start()

export default async function handler(req: NextApiRequest, res: NextApiResponse<ScheduleType>) {
  const userId = typeof req.query.id === 'string' ? req.query.id.split('').map(el => el === ' ' ? '+' : el).join('') : ''
  console.log('schedule request, method', req.method, 'userId: ', userId)
  if (req.method === 'GET'){
    res.status(200).json(await getSchedule(userId))
  }
  if (req.method === 'POST'){
    res.status(200).json(await changeSchedule(userId, req.body))
  }
}
