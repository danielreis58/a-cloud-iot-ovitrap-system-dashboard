import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: 'application/json; charset=UTF-8',
    'Content-Type': 'application/json; charset=UTF-8'
  }
})

api.interceptors.request.use((config) => {
  if (!config.url) {
    return config
  }

  const currentUrl = new URL(config.url, config.baseURL)
  // parse pathName to implement variables
  Object.entries(config.urlParams || {}).forEach(([k, v]) => {
    currentUrl.pathname = currentUrl.pathname.replace(
      `:${k}`,
      encodeURIComponent(v)
    )
  })

  // remove not founded params
  const patern = new RegExp('/:.+?(?=/|$)', 'igm')
  currentUrl.pathname = currentUrl.pathname.replace(patern, '')

  const authPart =
    currentUrl.username && currentUrl.password
      ? `${currentUrl.username}:${currentUrl.password}`
      : ''
  return {
    ...config,
    baseURL: `${currentUrl.protocol}//${authPart}${currentUrl.host}`,
    url: currentUrl.pathname
  }
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('authUser')
      delete api.defaults.headers.common.Authorization
      window.location = '/login'
      api.post('/logout')
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

export default api
