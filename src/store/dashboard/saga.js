import { takeEvery, fork, put, all, call } from 'redux-saga/effects'
import { GET_DASHBOARDS } from './actionTypes'
import { setDashboards, apiErrorDashboard } from './actions'
import api from '../../services/api'

function* getDashboards({ payload: { target } }) {
  try {
    const response = yield call(api.get, `/${target}`)
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
    yield put(apiErrorDashboard(target, message))
  }
}

export function* watchDashboard() {
  yield takeEvery(GET_DASHBOARDS, getDashboards)
}

function* dashboardSaga() {
  yield all([fork(watchDashboard)])
}

export default dashboardSaga
