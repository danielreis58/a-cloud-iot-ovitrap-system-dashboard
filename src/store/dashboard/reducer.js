import { isArray } from 'lodash'
import { arrayToObj, toIsoString } from '../../utils/customMethods'
import { READ_DATA, SET_DATA } from './actionTypes'

const initialState = {
  data: {},
  loading: false,
  success: false,
  error: false,
  catch: null
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
        case 'catch': {
          const { id, date, number } = action.payload.data.data

          const newTotal = state.data[id].total + number
          const newData = state.data[id].data.map((e) =>
            e.date.split('T')[0] === toIsoString(new Date(date)).split('T')[0]
              ? { ...e, total: e.total + number }
              : e
          )

          const newObj = {
            ...state.data[id],
            total: newTotal,
            data: newData
          }

          state = {
            ...state,
            catch: id,
            success: action.payload.data.success,
            data: {
              ...state.data,
              [id]: newObj
            }
          }
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
