import { all } from 'redux-saga/effects'

// Auth
import Login from './auth/login/saga'
import ForgetPassword from './auth/forgetpwd/saga'

// Datas
import Dashboards from './dashboard/saga'
import Companies from './companies/saga'
import Users from './users/saga'
import Ovitraps from './ovitraps/saga'

export default function* rootSaga() {
  yield all([
    Login(),
    ForgetPassword(),
    Dashboards(),
    Companies(),
    Users(),
    Ovitraps()
  ])
}
