import {
  CREATE_DATA,
  READ_DATA,
  UPDATE_DATA,
  DELETE_DATA,
  SET_DATA
} from './actionTypes'

export const createData = (data) => ({
  type: CREATE_DATA,
  payload: { data }
})
export const readData = (id) => ({
  type: READ_DATA,
  payload: { id }
})
export const updateData = (data) => ({
  type: UPDATE_DATA,
  payload: { data }
})
export const deleteData = (ids) => ({
  type: DELETE_DATA,
  payload: { ids }
})

export const setData = (data, action) => ({
  type: SET_DATA,
  payload: { data, action }
})
