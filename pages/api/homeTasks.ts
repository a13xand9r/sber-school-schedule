import { HomeTaskType } from './../../store'
import { addHomeTask, getHomeTasks } from './../../src/scenario/dataBase'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<HomeTaskType | HomeTaskType[] | null>) {
  const userId = typeof req.query.id === 'string' ? req.query.id.split('').map(el => el === ' ' ? '+' : el).join('') : ''
  console.log('homeTask request, method', req.method, 'userId: ', userId)
  if (req.method === 'GET'){
    res.status(200).json(await getHomeTasks(userId))
  }
  if (req.method === 'POST'){
    res.status(200).json(await addHomeTask(userId, req.body))
  }
}
