import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api',
})

export const pushSchedule = async () => {
  await axiosInstance.get('/schedule')
}