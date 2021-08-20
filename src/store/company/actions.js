import {
  CREATE_DATA,
  READ_DATA,
  UPDATE_DATA,
  DELETE_DATA,
  SET_DATA
} from './actionTypes'

export const createData = () => ({
  type: CREATE_DATA,
  payload: {}
})
export const readData = (id) => ({
  type: READ_DATA,
  payload: { id }
})
export const updateData = (data) => ({
  type: UPDATE_DATA,
  payload: { data }
})
export const deleteData = (id) => ({
  type: DELETE_DATA,
  payload: { id }
})

export const setData = (data, action) => ({
  type: SET_DATA,
  payload: { data, action }
})
