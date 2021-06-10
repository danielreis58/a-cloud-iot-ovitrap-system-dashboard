import SET_LAYOUT from './actionTypes'

const initialState = {
  layoutOpen: JSON.parse(localStorage.getItem('layoutOpen'))
}

const Layout = (state = initialState, action) => {
  switch (action.type) {
    case SET_LAYOUT:
      localStorage.setItem('layoutOpen', action.payload.layoutOpen)
      state = {
        layoutOpen: action.payload.layoutOpen
      }
      break

    default:
      break
  }
  return state
}

export default Layout
