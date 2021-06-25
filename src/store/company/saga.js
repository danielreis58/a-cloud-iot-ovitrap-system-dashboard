import { takeEvery, fork, put, all, call } from 'redux-saga/effects'

// Companies Redux States
import axios from 'axios'
import { GET_DATA } from './actionTypes'
import { setData } from './actions'

// Include Both Helper File with needed methods

function* getCompanies({ payload: { target } }) {
  try {
    const response = yield call(axios.get, `/company`)
    if (
      (response.status >= 200 || response.status <= 299) &&
      response?.data?.data?.data
    ) {
      yield put(setData(target, response.data.data.data))
    } else throw response.data
  } catch (error) {
    let message
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          message = 'Invalid credentials'
          break
        case 404:
          message = 'Sorry! the page you are looking for could not be found'
          break
        case 500:
          message =
            'Sorry! something went wrong, please contact our support team'
          break
        default:
          if (error.response.data && error.response.data.message)
            message = error.response.data.message
          else message = error.message
          break
      }
    }
    yield put(setData('error', message))
  }
}

export function* watchCompany() {
  yield takeEvery(GET_DATA, getCompanies)
}

function* companySaga() {
  yield all([fork(watchCompany)])
}

export default companySaga
