import { takeEvery, fork, put, all, call } from 'redux-saga/effects'

// Dashboards Redux States
import axios from 'axios'
import { GET_DASHBOARDS } from './actionTypes'
import { setDashboards, apiError } from './actions'

// Include Both Helper File with needed methods

function* getDashboards({ payload: { target } }) {
  try {
    const response = yield call(axios.get, `/${target}`)
    if (
      (response.status >= 200 || response.status <= 299) &&
      response?.data?.data
    ) {
      yield put(setDashboards(target, response.data.data))
    } else throw response.data
  } catch (error) {
    let message
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          message = 'Invalid credentials'
          break
        case 404:
          // TODO: remover esta verificação quando o backend enviar array vazio com status 200 quando nao ha objetos
          if (error.response.data && typeof error.response.data === 'object') {
            message = error.response.data.message
          } else {
            message = 'Sorry! the page you are looking for could not be found'
          }
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
    yield put(apiError(target, message))
  }
}

export function* watchDashboard() {
  yield takeEvery(GET_DASHBOARDS, getDashboards)
}

function* authSaga() {
  yield all([fork(watchDashboard)])
}

export default authSaga
