import axios from 'axios'

const globalVariable = {
  accessToken: '',
}

export const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND_1 })
API.interceptors.request.use((req) => {
  if (globalVariable.accessToken !== '') {
    req.headers.Authorization = `Bearer ${globalVariable.accessToken}`
  }

  return req
})

export default globalVariable
