import { takeEvery, fork, put, all, call } from 'redux-saga/effects'

import axios from 'axios'
import { LOGIN_USER, LOGOUT_USER } from './actionTypes'
import { loginSuccess, apiErrorLogin, logoutUserSuccess } from './actions'

import { getErrorMessage } from '../../../utils/sagaUtils'
import { integerBetween } from '../../../utils/customMethods'
import { setDefaultAxiosHeader, setLocalStorage } from '../../../utils/auth'

function* loginUser({ payload: user }) {
  try {
    const response = yield call(axios.post, '/login', {
      email: user.email,
      password: user.password
    })
    const status = response?.status
    const data = response?.data?.data?.data
    if (integerBetween(status, 200, 299) && data) {
      setLocalStorage(data)
      setDefaultAxiosHeader(data.Authorization)
      yield put(loginSuccess(data))
    } else throw response
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(apiErrorLogin(message))
  }
}

function* logoutUser() {
  try {
    const response = yield call(axios.post, '/logout')
    const status = response?.status
    const data = response?.data?.data
    if (integerBetween(status, 200, 299) && data) {
      yield put(logoutUserSuccess(data))
    } else throw response
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(apiErrorLogin(message))
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
