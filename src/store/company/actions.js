import { RESET_DATA, GET_DATA, SET_DATA, UPDATE_DATA } from './actionTypes'

export const resetData = (target) => ({
  type: RESET_DATA,
  payload: { target }
})

export const getData = (target) => ({
  type: GET_DATA,
  payload: { target }
})

export const setData = (target, data) => ({
  type: SET_DATA,
  payload: { target, data }
})

export const updateData = (target, data) => ({
  type: UPDATE_DATA,
  payload: { target, data }
})
