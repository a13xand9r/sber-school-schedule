import type { NextApiRequest, NextApiResponse } from 'next'
import { handleNlpRequest } from '../../src/scenario/scenario'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('api/hook method: ', req.method)
  if (req.method === 'POST'){
    res.status(200).json(await handleNlpRequest(req.body))
  }
}
