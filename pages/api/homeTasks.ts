import { addHomeTask, deleteHomeTask, getHomeTasks } from './../../src/scenario/dataBase'
import type { NextApiRequest, NextApiResponse } from 'next'
import { HomeTaskType } from '../../src/types'

export default async function handler(req: NextApiRequest, res: NextApiResponse<HomeTaskType | HomeTaskType[] | null>) {
  const userId = typeof req.query.userId === 'string' ? req.query.userId.split('').map(el => el === ' ' ? '+' : el).join('') : ''
  const itemId: string = req.query.id as string
  console.log('homeTask request, method', req.method, 'userId: ', userId)
  if (req.method === 'GET'){
    res.status(200).json(await getHomeTasks(userId))
  }
  if (req.method === 'POST'){
    res.status(200).json(await addHomeTask(userId, req.body))
  }
  if (req.method === 'DELETE'){
    res.status(200).json(await deleteHomeTask(userId, itemId))
  }
}
