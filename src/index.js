import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import App from './App'

import * as serviceWorker from './serviceWorker'
import './i18n'
import { Provider } from 'react-redux'

import { store } from './store'

// actions
import { loginSuccess, logoutUser } from './store/auth/login/actions'

const localAuthUser = localStorage.authUser

axios.defaults.baseURL = process.env.REACT_APP_API_URL
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
    store.dispatch(loginSuccess(authUser))
    axios.defaults.headers.common.Authorization = authUser.Authorization
  } else {
    if (authUser.Authorization) {
      store.dispatch(logoutUser(null, isExpired))
    }
    delete axios.defaults.headers.common.Authorization
  }
}

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
serviceWorker.unregister()
