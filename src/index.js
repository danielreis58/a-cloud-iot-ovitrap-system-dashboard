import React from 'react'
import ReactDOM from 'react-dom'
import { CssBaseline } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import CustomThemeProvider from './config/CutomThemeProvider'
import App from './App'

import * as serviceWorker from './serviceWorker'
import './i18n'

import store from './store'

// actions
import { loginSuccess, logoutUser } from './store/auth/login/actions'

const localAuthUser = localStorage.authUser

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL = process.env.REACT_APP_API_URL

let isExpired = false
let authUser = {}

const setDefaultAxiosHeader = (authorization) => {
  if (authorization) {
    axios.defaults.headers.common.Authorization = authorization
  } else {
    delete axios.defaults.headers.common.Authorization
  }
}

const setLocalStorage = (data) => {
  if (data) {
    localStorage.setItem('authUser', JSON.stringify(data))
  } else {
    localStorage.removeItem('authUser')
  }
}

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
