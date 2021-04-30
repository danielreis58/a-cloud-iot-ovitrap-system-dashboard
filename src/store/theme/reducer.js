import SET_THEME from './actionTypes'

const initialState = {
  theme: localStorage.getItem('theme') ?? 'dark'
}

const Theme = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      localStorage.setItem('theme', action.payload.data)
      state = {
        theme: action.payload.data
      }
      break

    default:
      break
  }
  return state
}

export default Theme
