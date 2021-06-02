import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { Menu, MenuItem } from '@material-ui/core'

import { Brightness4 as DarkLightModeIcon } from '@material-ui/icons'

import IconButton from '../../atoms/inputs/iconButton'

import setTheme from '../../../store/theme/actions'

const SwitchTheme = ({ t }) => {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)
  const [menuTheme, setMenuTheme] = useState(false)

  const handleOpenMenuTheme = (event) => {
    setAnchorEl(event.currentTarget)
    setMenuTheme(true)
  }

  return (
    <>
      <IconButton size="medium" onClick={(event) => handleOpenMenuTheme(event)}>
        <DarkLightModeIcon fontSize="inherit" />
      </IconButton>
      <Menu
        id="theme-menu"
        anchorEl={anchorEl}
        keepMounted
        open={menuTheme}
        onClose={() => setMenuTheme(false)}
      >
        <MenuItem
          onClick={() => {
            dispatch(setTheme('dark'))
            setMenuTheme(false)
          }}
        >
          {t('themes.dark')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(setTheme('light'))
            setMenuTheme(false)
          }}
        >
          {t('themes.light')}
        </MenuItem>
      </Menu>
    </>
  )
}

export default withTranslation()(SwitchTheme)
