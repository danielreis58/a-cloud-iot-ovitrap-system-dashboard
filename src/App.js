import React from 'react'
import { Switch, BrowserRouter as Router } from 'react-router-dom'

import AppRoute from './routes/route'
import Layout from './components/organism/layout/main'

// Import Routes
import { authProtectedRoutes, publicRoutes } from './routes/index'

const App = () => (
  <React.Fragment>
    <Router>
      <Switch>
        {publicRoutes.map((route, key) => (
          <AppRoute
            path={route.path}
            component={route.component}
            key={key}
            isAuthProtected={false}
          />
        ))}

        {authProtectedRoutes.map((route, idx) => (
          <AppRoute
            path={route.path}
            layout={Layout}
            component={route.component}
            key={idx}
            isAuthProtected={true}
            isPermissionProtected={route.isPermissionProtected}
            permissionName={route.permissionName}
          />
        ))}
      </Switch>
    </Router>
  </React.Fragment>
)

export default App
