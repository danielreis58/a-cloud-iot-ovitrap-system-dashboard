import { takeEvery, fork, put, all, call } from 'redux-saga/effects'
import { FORGET_PASSWORD, SET_NEW_PASSWORD } from './actionTypes'
import {
  userForgetPasswordSuccess,
  apiErrorForgetPassword,
  userSetNewPasswordSuccess
} from './actions'
import api from '../../../services/api'

function* userForgetPassword({ payload: { user } }) {
  try {
    const response = yield call(api.post, '/security/user/password-reset', {
      email: user.email,
      slug: user.slug
    })
    if (
      (response.status >= 200 || response.status <= 299) &&
      response.data &&
      response.data.data
    ) {
      const { message } = response.data
      yield put(userForgetPasswordSuccess(message))
    } else {
      throw response.data
    }
  } catch (error) {
    let message = ''
    if (error?.message || error?.response?.data?.message) {
      message = error.response.data.message
    } else {
      message = error.message
    }
    yield put(apiErrorForgetPassword(message))
  }
}

function* userSetNewPassword({ payload: { user, history, pswToken } }) {
  try {
    const response = yield call(
      api.post,
      '/user/password-change',
      {
        password: user.password
      },
      { headers: { Authorization: pswToken } }
    )
    if (
      (response.status >= 200 || response.status <= 299) &&
      response.data &&
      response.data.data
    ) {
      const { message } = response.data
      yield put(userSetNewPasswordSuccess(message))
      setTimeout(() => {
        history.push('/login')
      }, 2500)
    } else {
      throw response.data
    }
  } catch (error) {
    let message = ''
    if (error?.message || error?.response?.data?.message) {
      message = error.response.data.message
    } else {
      message = error.message
    }
    yield put(apiErrorForgetPassword(message))
  }
}
export function* watchUserPasswordForget() {
  yield takeEvery(FORGET_PASSWORD, userForgetPassword)
}
export function* watchUserPasswordChange() {
  yield takeEvery(SET_NEW_PASSWORD, userSetNewPassword)
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget), fork(watchUserPasswordChange)])
}

export default forgetPasswordSaga
