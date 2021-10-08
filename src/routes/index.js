import React from 'react'
import { Redirect } from 'react-router-dom'

// Authentication related pages
import Login from '../pages/Authentication/Login'
import Logout from '../pages/Authentication/Logout'
import ForgotPassword from '../pages/Authentication/ForgotPassword'
import NewPassword from '../pages/Authentication/NewPassword'

// Dashboard
import Dashboard from '../pages/Dashboard/index'
import Companies from '../pages/Companies/index'
import Users from '../pages/Users/index'
import Ovitraps from '../pages/Ovitraps/index'

const authProtectedRoutes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/companies', component: Companies },
  { path: '/users', component: Users },
  { path: '/ovitraps', component: Ovitraps },

  // this route should be at the end of all other routes
  { path: '/', exact: true, component: () => <Redirect to="/dashboard" /> }
]

const publicRoutes = [
  { path: '/logout', component: Logout },
  { path: '/login', component: Login },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/new-password/:token', component: NewPassword }
]

export { authProtectedRoutes, publicRoutes }
