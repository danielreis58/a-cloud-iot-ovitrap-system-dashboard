import { takeEvery, fork, put, all, call } from 'redux-saga/effects'
import { FORGOT_PASSWORD, SET_NEW_PASSWORD } from './actionTypes'
import {
  forgotPasswordSuccess,
  setNewPasswordSuccess,
  errorPassword
} from './actions'

import { getErrorMessage } from '../../../utils/sagaUtils'
import { integerBetween } from '../../../utils/customMethods'
import api from '../../../services/api'

function* forgotPassword({ payload: { email } }) {
  try {
    const response = yield call(api.post, '/forgot-password', {
      email
    })
    const status = response?.status
    const data = response?.data?.data
    if (integerBetween(status, 200, 299) && data) {
      yield put(forgotPasswordSuccess(data))
    } else {
      throw response.data
    }
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(errorPassword(message))
  }
}

function* setNewPassword({ payload: { password, token } }) {
  try {
    const response = yield call(
      api.post,
      '/new-password',
      {
        password
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    const status = response?.status
    const data = response?.data?.data?.data
    if (integerBetween(status, 200, 299) && data) {
      yield put(setNewPasswordSuccess(data))
    } else {
      throw response.data
    }
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(errorPassword(message))
  }
}
export function* watchUserForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword)
}
export function* watchUserSetNewPassword() {
  yield takeEvery(SET_NEW_PASSWORD, setNewPassword)
}

function* forgotPasswordSaga() {
  yield all([fork(watchUserForgotPassword), fork(watchUserSetNewPassword)])
}

export default forgotPasswordSaga
