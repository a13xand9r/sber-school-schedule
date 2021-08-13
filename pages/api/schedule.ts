import { ScheduleType } from './../../store';
import { changeSchedule, getSchedule } from './../../scenario/scheduleData';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<ScheduleType>) {
  console.log('schedule request, method', req.method, 'userId: ', req.query.id)
  if (req.method === 'GET'){
    res.status(200).json(getSchedule(req.query.id as string))
  }
  if (req.method === 'POST'){
    res.status(200).json(changeSchedule(req.query.id as string, req.body))
  }
}
