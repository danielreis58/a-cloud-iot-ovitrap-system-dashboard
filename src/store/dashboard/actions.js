import { READ_DATA, SET_DATA } from './actionTypes'

export const readData = (range) => ({
  type: READ_DATA,
  payload: { range }
})

export const setData = (data, action) => ({
  type: SET_DATA,
  payload: { data, action }
})
