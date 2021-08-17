import { ScheduleType } from './../../store';
import { changeSchedule, getSchedule, start } from '../../src/scenario/dataBase';
import type { NextApiRequest, NextApiResponse } from 'next'

start()

export default async function handler(req: NextApiRequest, res: NextApiResponse<ScheduleType>) {
  console.log('schedule request, method', req.method, 'userId: ', req.query.id)
  if (req.method === 'GET'){
    res.status(200).json(await getSchedule(req.query.id as string))
  }
  if (req.method === 'POST'){
    res.status(200).json(await changeSchedule(req.query.id as string, req.body))
  }
}
