import { changeSchedule } from './../../scenario/scheduleData';
import type { NextApiRequest, NextApiResponse } from 'next'
import { writeJSON } from '../../scenario/scheduleData'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('schedule request')
  changeSchedule('111')
  res.status(200).json({hello: 'Hi Mark'})
}
