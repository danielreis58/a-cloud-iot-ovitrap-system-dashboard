import { takeEvery, fork, put, all, call } from 'redux-saga/effects'
import { CREATE_DATA, READ_DATA, UPDATE_DATA, DELETE_DATA } from './actionTypes'
import { setData } from './actions'
import { getErrorMessage } from '../../utils/sagaUtils'
import api from '../../services/api'

function* createData({ payload: { data: newData } }) {
  try {
    const response = yield call(api.post, `/company`)
    const data = response?.data?.data?.data
    if ((response.status >= 200 || response.status <= 299) && data) {
      const object = { [data?.id]: newData }
      yield put(
        setData('create', { data: object, loading: false, success: true })
      )
    } else throw response.data
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(setData({ error: message, loading: false, success: false }))
  }
}

function* readData({ payload: { id } }) {
  try {
    const urlParams = {}
    if (id) urlParams.id = id

    const response = yield call(api.get, `/company/:id`, {
      urlParams
    })
    const data = response?.data?.data?.data
    if ((response.status >= 200 || response.status <= 299) && data) {
      yield put(setData('read', { data, loading: false, success: true }))
    } else throw response.data
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(setData({ error: message, loading: false, success: false }))
  }
}

function* updateData({ payload: { data: newData } }) {
  try {
    const urlParams = {}
    if (newData?.id) urlParams.id = newData.id

    const response = yield call(api.patch, `/company/:id`, newData, {
      urlParams
    })
    const data = response?.data?.data?.data
    if ((response.status >= 200 || response.status <= 299) && data?.id) {
      const object = { [data?.id]: newData }
      yield put(
        setData('update', { data: object, loading: false, success: true })
      )
    } else throw response.data
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(setData({ error: message, loading: false, success: false }))
  }
}

function* deleteData({ payload: { id } }) {
  try {
    const urlParams = {}
    if (id) urlParams.id = id

    const response = yield call(api.delete, `/company/:id`, {
      urlParams
    })
    const data = response?.data?.data?.data
    if ((response.status >= 200 || response.status <= 299) && data?.id) {
      yield put(setData('delete', { data, loading: false, success: true }))
    } else throw response.data
  } catch (error) {
    const message = getErrorMessage(error)
    yield put(setData({ error: message, loading: false, success: false }))
  }
}
export function* watchCreateData() {
  yield takeEvery(CREATE_DATA, createData)
}

export function* watchReadData() {
  yield takeEvery(READ_DATA, readData)
}

export function* watchUpdateData() {
  yield takeEvery(UPDATE_DATA, updateData)
}

export function* watchDeleteData() {
  yield takeEvery(DELETE_DATA, deleteData)
}

function* companySaga() {
  yield all([
    fork(watchCreateData),
    fork(watchReadData),
    fork(watchUpdateData),
    fork(watchDeleteData)
  ])
}

export default companySaga
