import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(config => {
  config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
  return config
})



export default api
