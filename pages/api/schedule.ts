import { changeSchedule, getSchedule, start } from '../../src/scenario/dataBase';
import type { NextApiRequest, NextApiResponse } from 'next'
import { ScheduleType } from '../../src/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ScheduleType>) {
  const userId = typeof req.query.userId === 'string' ? req.query.userId.split('').map(el => el === ' ' ? '+' : el).join('') : ''
  const itemId: string = req.query.id as string
  console.log('schedule request, method', req.method, 'userId: ', userId)
  if (req.method === 'GET'){
    res.status(200).json(await getSchedule(userId))
  }
  if (req.method === 'POST'){
    res.status(200).json(await changeSchedule(userId, req.body))
  }
}
