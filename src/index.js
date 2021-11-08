import React from 'react'
import ReactDOM from 'react-dom'
import { CssBaseline } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwtDecode from 'jwt-decode'
import CustomThemeProvider from './config/CustomThemeProvider'
import SocketIo from './config/SocketIo'
import App from './App'

import * as serviceWorker from './serviceWorker'
import './i18n'

import store from './store'

// actions
import { loginSuccess, logoutUser } from './store/auth/login/actions'
import { setDefaultAxiosHeader, setLocalStorage } from './utils/auth'

const localAuthUser = localStorage.authUser

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
    <SocketIo />
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
