import React from 'react'
import { Redirect } from 'react-router-dom'

// Authentication related pages
import Login from '../pages/Authentication/Login.js'
import Logout from '../pages/Authentication/Logout.js'
import ForgetPassword from '../pages/Authentication/ForgetPassword.js'
import ResetPassword from '../pages/Authentication/ResetPassword.js'

// Dashboard
import Dashboard from '../pages/Dashboard/index'

const authProtectedRoutes = [
  { path: '/dashboard', component: Dashboard },

  // this route should be at the end of all other routes
  { path: '/', exact: true, component: () => <Redirect to="/dashboard" /> }
]

const publicRoutes = [
  { path: '/logout', component: Logout },
  { path: '/login', component: Login },
  { path: '/forgot-password', component: ForgetPassword },
  { path: '/reset-password/:token', component: ResetPassword }
]

export { authProtectedRoutes, publicRoutes }
