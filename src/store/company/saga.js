import { takeEvery, fork, put, all, call } from 'redux-saga/effects'
import { GET_DATA, UPDATE_DATA } from './actionTypes'
import { setData } from './actions'
import { getErrorMessage } from '../../utils/sagaUtils'
import api from '../../services/api'

function* getCompanies({ payload: { target } }) {
  try {
    const response = yield call(api.get, `/company`)
    if (
      (response.status >= 200 || response.status <= 299) &&
      response?.data?.data?.data
    ) {
      yield put(setData(target, response.data.data.data))
    } else throw response.data
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(setData('error', message))
  }
}

function* setCompany({ payload: { target, data } }) {
  try {
    const urlParams = {}
    if (data?.id) urlParams.id = data.id

    const response = yield call(api.patch, `/company/:id`, data, {
      urlParams
    })
    if (
      (response.status >= 200 || response.status <= 299) &&
      response?.data?.data?.data
    ) {
      // TODO: IMPROVE
      // yield put(setData(target, response.data.data.data))
    } else throw response.data
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(setData('error', message))
  }
}

export function* watchGetCompany() {
  yield takeEvery(GET_DATA, getCompanies)
}

export function* watchSetCompany() {
  yield takeEvery(UPDATE_DATA, setCompany)
}

function* companySaga() {
  yield all([fork(watchGetCompany), fork(watchSetCompany)])
}

export default companySaga
