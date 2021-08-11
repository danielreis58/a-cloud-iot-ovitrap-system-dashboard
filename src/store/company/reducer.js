import { arrayToObj } from '../../utils/customMethods'
import { RESET_DATA, GET_DATA, SET_DATA, UPDATE_DATA } from './actionTypes'

const initialState = {
  data: null,
  loading: false,
  success: false,
  error: false
}

const Companies = (state = initialState, action) => {
  switch (action.type) {
    case RESET_DATA:
      state = {
        ...state,
        [action.payload.target]: initialState[action.payload.target]
      }
      break
    case GET_DATA:
      state = {
        ...state,
        loading: true,
        success: false,
        error: false
      }
      break
    case SET_DATA: {
      const object = arrayToObj(action?.payload?.data, 'id')
      state = {
        ...state,
        [action.payload.target]: object,
        loading: false
      }
      break
    }
    case UPDATE_DATA:
      {
        const id = action?.payload?.data?.id
        const newData = action?.payload?.data
        const newTarget = { ...state?.[action?.payload?.target], [id]: newData }
        state = {
          ...state,
          [action.payload.target]: newTarget,
          loading: false
        }
      }
      break
    default:
      break
  }
  return state
}

export default Companies
