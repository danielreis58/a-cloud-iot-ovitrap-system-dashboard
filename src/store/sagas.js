import { all } from 'redux-saga/effects'

// Auth
import Login from './auth/login/saga'
import Password from './auth/password/saga'

// Datas
import Dashboards from './dashboard/saga'
import Companies from './companies/saga'
import Users from './users/saga'
import Ovitraps from './ovitraps/saga'

export default function* rootSaga() {
  yield all([
    Login(),
    Password(),
    Dashboards(),
    Companies(),
    Users(),
    Ovitraps()
  ])
}
