import api from '../services/api'

export const setDefaultAxiosHeader = (authorization) => {
  if (authorization) {
    api.defaults.headers.common.Authorization = authorization
  } else {
    delete api.defaults.headers.common.Authorization
  }
}

export const setLocalStorage = (data) => {
  if (data) {
    localStorage.setItem('authUser', JSON.stringify(data))
  } else {
    localStorage.removeItem('authUser')
  }
}
