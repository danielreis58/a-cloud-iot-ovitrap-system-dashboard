import { takeEvery, fork, put, all, call } from 'redux-saga/effects'

// Login Redux States
import axios from 'axios'
import { LOGIN_USER, LOGOUT_USER } from './actionTypes'
import { loginSuccess, apiError, logoutUserSuccess } from './actions'

// Include Both Helper File with needed methods

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(axios.post, '/security/user/login', {
      email: user.email,
      password: user.password,
      slug: user.slug
    })
    if (
      (response.status >= 200 || response.status <= 299) &&
      response?.data?.data
    ) {
      axios.defaults.headers.common.Authorization =
        response.data.data.Authorization
      localStorage.setItem('authUser', JSON.stringify(response.data.data))
      response.data.data.availabilities.map(
        (fixAvail) =>
          fixAvail.default === '1' &&
          localStorage.setItem('status', fixAvail.name)
      )
      yield put(loginSuccess(response.data.data))
      if (history) {
        history.push('/dashboard')
      }
    } else throw response.data
  } catch (error) {
    let message = ''
    if (error?.message || error?.response?.data?.message) {
      message = error.response.data.message
    } else {
      message = error.message
    }
    yield put(apiError(message))
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
      yield put(apiError(message))
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
