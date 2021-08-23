import { isArray, omit } from 'lodash'
import { arrayToObj } from '../../utils/customMethods'
import {
  CREATE_DATA,
  READ_DATA,
  UPDATE_DATA,
  DELETE_DATA,
  SET_DATA
} from './actionTypes'

const initialState = {
  data: {},
  page: 0,
  rowsPerPage: 5,
  dense: false,
  loading: false,
  success: false,
  error: false
}

const Companies = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DATA:
    case READ_DATA:
    case UPDATE_DATA:
    case DELETE_DATA:
      state = {
        ...state,
        loading: true,
        success: false,
        error: false
      }
      break
    case SET_DATA: {
      switch (action.payload.action) {
        case 'create':
        case 'update': {
          const newData = { ...state.data, ...action.payload.data.data }
          state = { ...state, ...action.payload.data, data: newData }
          break
        }
        case 'read': {
          const { data } = action.payload.data
          const newData = isArray(data)
            ? arrayToObj(data, 'id')
            : { [data.id]: data }
          state = { ...state, ...action.payload.data, data: newData }
          break
        }
        case 'delete': {
          const newData = omit(state.data, action.payload.data.data)
          state = { ...state, ...action.payload.data, data: newData }
          break
        }
        default:
          state = { ...state, ...action.payload.data }
          break
      }

      break
    }
    default:
      break
  }
  return state
}

export default Companies
