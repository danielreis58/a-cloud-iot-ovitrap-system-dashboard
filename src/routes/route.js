import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AppRoute = ({
  component: Component,
  isAuthProtected,
  isPermissionProtected,
  permissionName,
  ...rest
}) => {
  const { data } = useSelector((state) => state.Login)
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthProtected && !localStorage.getItem('authUser')) {
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
        }
        if (
          isPermissionProtected &&
          !data?.userPermissions?.some((e) => e.name === permissionName)
        ) {
          return <Redirect to={{ pathname: '/dashboard' }} />
        }
        if (data?.userPermissions?.some((e) => e.name === permissionName)) {
          // HAVE PERMISSION
          // TODO: GET POST PUT DELETE Validations
        } else {
          // NO PERMISSION
        }

        return <Component {...props} />
      }}
    />
  )
}

export default AppRoute
