import SET_LOCALE from './actionTypes'

const initialState = {
  locale: localStorage.getItem('i18nextLng') ?? 'pt-BR'
}

const Locale = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCALE:
      localStorage.setItem('i18nextLng', action.payload.data)
      state = {
        locale: action.payload.data
      }
      break

    default:
      break
  }
  return state
}

export default Locale
