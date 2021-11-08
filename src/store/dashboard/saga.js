import { takeEvery, fork, put, all, call } from 'redux-saga/effects'
import { READ_DATA } from './actionTypes'
import { setData } from './actions'
import api from '../../services/api'

const endPoint = 'dashboard'

function* readData({ payload: { range } }) {
  try {
    const urlParams = {}
    const offset = new Date().getTimezoneOffset()
    urlParams.offset = offset
    if (range) urlParams.range = range

    const response = yield call(api.get, `/${endPoint}/:offset`, {
      urlParams
    })
    const data = response?.data?.data
    if ((response.status >= 200 || response.status <= 299) && data) {
      yield put(setData({ data, loading: false, success: 'read' }, 'read'))
    } else throw response.data
  } catch (error) {
    yield put(setData({ error: 'read', loading: false, success: false }))
  }
}

export function* watchReadData() {
  yield takeEvery(READ_DATA, readData)
}

function* dataSaga() {
  yield all([fork(watchReadData)])
}

export default dataSaga
