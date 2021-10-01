import { isArray } from 'lodash'
import { arrayToObj } from '../../utils/customMethods'
import { READ_DATA, SET_DATA } from './actionTypes'

const initialState = {
  data: {},
  loading: false,
  success: false,
  error: false
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_DATA:
      state = {
        ...state,
        loading: true,
        success: false,
        error: false
      }
      break
    case SET_DATA: {
      switch (action.payload.action) {
        case 'read': {
          const { data, form } = action.payload.data.data
          const newData = isArray(data)
            ? arrayToObj(data, 'id')
            : { [data.id]: data }
          state = { ...state, ...action.payload.data, data: newData, form }
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

export default dataReducer
