import React from 'react'
import ReactDOM from 'react-dom'
import { CssBaseline } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import CustomThemeProvider from './config/CutomThemeProvider'
import App from './App'
import api from './services/api'

import * as serviceWorker from './serviceWorker'
import './i18n'

import store from './store'

// actions
import { loginSuccess, logoutUser } from './store/auth/login/actions'
import { setDefaultAxiosHeader, setLocalStorage } from './utils/auth'

const localAuthUser = localStorage.authUser

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.interceptors.request.use((config) => {
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

let isExpired = false
let authUser = {}

if (localAuthUser) {
  authUser = JSON.parse(localAuthUser)

  if (authUser.Authorization) {
    const decodedToken = jwtDecode(authUser.Authorization)
    if (decodedToken.exp * 1000 <= Date.now()) {
      isExpired = true
    }
  }
  if (authUser && !isExpired) {
    setLocalStorage(authUser)
    setDefaultAxiosHeader(authUser.Authorization)
    store.dispatch(loginSuccess(authUser))
  } else if (authUser.Authorization) {
    setLocalStorage()
    setDefaultAxiosHeader()
    store.dispatch(logoutUser())
  }
}

const app = (
  <Provider store={store}>
    <CustomThemeProvider>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CustomThemeProvider>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
serviceWorker.unregister()
