import React, { useContext } from 'react'
import { withTranslation } from 'react-i18next'

import { Menu, MenuItem } from '@material-ui/core'

import { Brightness4 as DarkLightModeIcon } from '@material-ui/icons'
import { CustomThemeContext } from '../../../store/Theme'

import IconButton from '../../atoms/inputs/iconButton'

const Signin = ({ t }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [menuTheme, setMenuTheme] = React.useState(false)
  const { setTheme } = useContext(CustomThemeContext)

  const handleOpenMenuTheme = (event) => {
    setAnchorEl(event.currentTarget)
    setMenuTheme(true)
  }

  return (
    <>
      <IconButton size="medium" onClick={(event) => handleOpenMenuTheme(event)}>
        <DarkLightModeIcon fontSize="inherit" color="primary" />
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
            setTheme('dark')
            setMenuTheme(false)
          }}
        >
          {t('themes.dark')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setTheme('normal')
            setMenuTheme(false)
          }}
        >
          {t('themes.light')}
        </MenuItem>
      </Menu>
    </>
  )
}

export default withTranslation()(Signin)
