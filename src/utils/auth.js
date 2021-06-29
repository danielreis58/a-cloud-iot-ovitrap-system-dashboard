import axios from 'axios'

export const setDefaultAxiosHeader = (authorization) => {
  if (authorization) {
    axios.defaults.headers.common.Authorization = authorization
  } else {
    delete axios.defaults.headers.common.Authorization
  }
}

export const setLocalStorage = (data) => {
  if (data) {
    localStorage.setItem('authUser', JSON.stringify(data))
  } else {
    localStorage.removeItem('authUser')
  }
}
