import { READ_DATA, SET_DATA } from './actionTypes'

export const readData = (id) => ({
  type: READ_DATA,
  payload: { id }
})

export const setData = (data, action) => ({
  type: SET_DATA,
  payload: { data, action }
})
