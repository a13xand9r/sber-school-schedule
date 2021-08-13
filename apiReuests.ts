import { ScheduleType } from './store';
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api',
})

export const requestSchedule = async (id: string): Promise<ScheduleType> => {
  const res = await axiosInstance.get<ScheduleType>(`/schedule?id=${id}`)
  return res.data
}
export const changeSchedule = async (id: string,data: ScheduleType): Promise<ScheduleType> => {
  const res = await axiosInstance.post<ScheduleType>(`/schedule?id=${id}`, data)
  return res.data
}