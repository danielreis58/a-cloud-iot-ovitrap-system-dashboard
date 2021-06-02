import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useHistory } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { Menu, MenuItem } from '@material-ui/core'

import AccountCircle from '@material-ui/icons/AccountCircle'

import IconButton from '../../atoms/inputs/iconButton'
import Alert from '../../molecules/feedback/alert'

import { apiResetLogin, logoutUser } from '../../../store/auth/login/actions'

const RightProfileMenu = ({ t }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { successLogout, loading } = useSelector((state) => state.Login)
  const [anchorEl, setAnchorEl] = useState(null)
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenAlert, setIsOpenAlert] = useState(false)

  const handleOpenMenuTheme = (event) => {
    setAnchorEl(event.currentTarget)
    setIsOpenMenu(true)
  }

  const signOut = () => {
    dispatch(apiResetLogin())
    dispatch(logoutUser())
  }

  useEffect(() => {
    if (successLogout) {
      dispatch(apiResetLogin())
      localStorage.removeItem('authUser')
      if (history) {
        history.push('/login')
      }
    }
  }, [successLogout])

  return (
    <>
      <IconButton size="medium" onClick={(event) => handleOpenMenuTheme(event)}>
        <AccountCircle />
      </IconButton>
      <Menu
        id="theme-menu"
        anchorEl={anchorEl}
        keepMounted
        open={isOpenMenu}
        onClose={() => setIsOpenMenu(false)}
      >
        <MenuItem
          onClick={() => {
            setIsOpenMenu(false)
          }}
        >
          {t('rightProfileMenu.profile')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            // dispatch(logout())
            setIsOpenAlert(true)
            setIsOpenMenu(false)
          }}
        >
          {t('rightProfileMenu.logout')}
        </MenuItem>
      </Menu>
      {isOpenAlert && (
        <Alert
          title={t('commons.question')}
          text={t('alerts.signout')}
          open={setIsOpenAlert}
          agreeAction={() => signOut()}
          loading={loading}
        />
      )}
    </>
  )
}

export default withTranslation()(RightProfileMenu)
