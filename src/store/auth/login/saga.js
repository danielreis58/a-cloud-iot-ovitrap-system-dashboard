import { takeEvery, fork, put, all, call } from 'redux-saga/effects'

import axios from 'axios'
import { LOGIN_USER, LOGOUT_USER } from './actionTypes'
import { loginSuccess, apiErrorLogin, logoutUserSuccess } from './actions'

import { getErrorMessage } from '../../../utils/sagaUtils'
import { integerBetween } from '../../../utils/customMethods'

const setDefaultAxiosHeader = (authorization) => {
  if (authorization) {
    axios.defaults.headers.common.Authorization = authorization
  }
}

const setLocalStorage = (data) => {
  if (data) {
    localStorage.setItem('authUser', JSON.stringify(data))
  }
}

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(axios.post, '/login', {
      email: user.email,
      password: user.password
    })
    const status = response?.status
    const data = response?.data?.body?.data
    const message = response?.data?.body?.message
    if (integerBetween(status, 200, 299) && data) {
      setLocalStorage(data)
      setDefaultAxiosHeader(data?.Authorization)
      yield put(loginSuccess(data))
    } else throw message
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(apiErrorLogin(message))
  }
}

function* logoutUser({ payload: { history, isExpired = false } }) {
  localStorage.removeItem('authUser')
  if (isExpired === false) {
    try {
      const response = yield call(axios.post, '/user/logout')
      if (
        !(
          (response.status >= 200 || response.status <= 299) &&
          response?.data?.data
        )
      ) {
        throw response.data
      }
    } catch (error) {
      let message = ''
      if (error?.message || error?.response?.data?.message) {
        message = error.response.data.message
      } else {
        message = error.message
      }
      yield put(apiErrorLogin(message))
    } finally {
      yield put(logoutUserSuccess())
      if (history) {
        history.push('/login')
      }
    }
  }
}

export function* watchUserLogin() {
  yield takeEvery(LOGIN_USER, loginUser)
}

export function* watchUserLogout() {
  yield takeEvery(LOGOUT_USER, logoutUser)
}

function* authSaga() {
  yield all([fork(watchUserLogin), fork(watchUserLogout)])
}

export default authSaga
