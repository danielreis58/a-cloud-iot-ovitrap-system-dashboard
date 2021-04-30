import {
  RESET_DASHBOARDS,
  RESET_ERROR_DASHBOARDS,
  GET_DASHBOARDS,
  SET_DASHBOARDS,
  API_ERROR_DASHBOARD
} from './actionTypes'

export const resetDashboards = (target) => ({
  type: RESET_DASHBOARDS,
  payload: { target }
})

export const resetError = (target) => ({
  type: RESET_ERROR_DASHBOARDS,
  payload: { target }
})

export const getDashboards = (target) => ({
  type: GET_DASHBOARDS,
  payload: { target }
})

export const setDashboards = (target, data) => ({
  type: SET_DASHBOARDS,
  payload: { target, data }
})

export const apiErrorDashboard = (target, error) => ({
  type: API_ERROR_DASHBOARD,
  payload: { target, error }
})
