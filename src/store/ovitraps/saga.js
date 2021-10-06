import { takeEvery, fork, put, all, call } from 'redux-saga/effects'
import { CREATE_DATA, READ_DATA, UPDATE_DATA, DELETE_DATA } from './actionTypes'
import { setData } from './actions'
import api from '../../services/api'

const endPoint = 'ovitrap'

function* createData({ payload: { data: newData } }) {
  try {
    const response = yield call(api.post, `/${endPoint}`, newData)
    const data = response?.data?.data?.data
    if ((response.status >= 200 || response.status <= 299) && data) {
      const object = { [data?.id]: { id: [data?.id], ...newData } }
      yield put(
        setData({ data: object, loading: false, success: 'create' }, 'create')
      )
    } else throw response.data
  } catch (error) {
    yield put(setData({ error: 'create', loading: false, success: false }))
  }
}

function* readData({ payload: { id } }) {
  try {
    const urlParams = {}
    if (id) urlParams.id = id

    const response = yield call(api.get, `/${endPoint}/:id`, {
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

function* updateData({ payload: { data: newData } }) {
  try {
    const urlParams = {}
    if (newData?.id) urlParams.id = newData.id

    const response = yield call(api.patch, `/${endPoint}/:id`, newData, {
      urlParams
    })
    const data = response?.data?.data?.data
    if ((response.status >= 200 || response.status <= 299) && data?.id) {
      const object = { [data?.id]: newData }
      yield put(
        setData({ data: object, loading: false, success: 'update' }, 'update')
      )
    } else throw response.data
  } catch (error) {
    yield put(setData({ error: 'update', loading: false, success: false }))
  }
}

function* deleteData({ payload: { ids } }) {
  try {
    const urlParams = {}
    if (ids) urlParams.id = ids.join()

    const response = yield call(api.delete, `/${endPoint}/:id`, {
      urlParams
    })
    const data = response?.data?.data?.data
    if ((response.status >= 200 || response.status <= 299) && data?.id) {
      yield put(
        setData({ data: ids, loading: false, success: 'delete' }, 'delete')
      )
    } else throw response.data
  } catch (error) {
    yield put(setData({ error: 'delete', loading: false, success: false }))
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

function* dataSaga() {
  yield all([
    fork(watchCreateData),
    fork(watchReadData),
    fork(watchUpdateData),
    fork(watchDeleteData)
  ])
}

export default dataSaga
