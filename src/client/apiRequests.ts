import { HomeTaskType } from './../../store';
import { ScheduleType } from '../../store';
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api',
})

export const requestSchedule = async (userId: string): Promise<ScheduleType> => {
  const res = await axiosInstance.get<ScheduleType>(`/schedule?userId=${userId}`)
  return res.data
}
export const postSchedule = async (userId: string,data: ScheduleType): Promise<ScheduleType> => {
  const res = await axiosInstance.post<ScheduleType>(`/schedule?userId=${userId}`, data)
  return res.data
}
export const deleteHomeTask = async (userId: string, id: string): Promise<ScheduleType> => {
  const res = await axiosInstance.delete<ScheduleType>(`/homeTasks?userId=${userId}&id=${id}`)
  return res.data
}

export const requestHomeTasks = async (userId: string): Promise<HomeTaskType[]> => {
  const res = await axiosInstance.get<HomeTaskType[]>(`/homeTasks?userId=${userId}`)
  return res.data
}
export const changeHomeTasks = async (userId: string,data: HomeTaskType): Promise<HomeTaskType> => {
  const res = await axiosInstance.post<HomeTaskType>(`/homeTasks?userId=${userId}`, data)
  return res.data
}