import { combineReducers } from 'redux'

// Theme
import Themes from './theme/reducer'

// Locale
import Locales from './locale/reducer'

// Layout
import Layout from './layout/reducer'

// Auth
import Login from './auth/login/reducer'
import Password from './auth/password/reducer'

// Data
import Dashboards from './dashboard/reducer'
import Companies from './companies/reducer'
import Users from './users/reducer'
import Ovitraps from './ovitraps/reducer'

const rootReducer = combineReducers({
  Login,
  Password,
  Dashboards,
  Themes,
  Locales,
  Layout,
  Companies,
  Users,
  Ovitraps
})

export default rootReducer
