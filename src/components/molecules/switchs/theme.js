import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Brightness4 as DarkModeIcon,
  Brightness5 as LightModeIcon
} from '@material-ui/icons'

import IconButton from '../../atoms/inputs/iconButton'

import setTheme from '../../../store/theme/actions'

const SwitchTheme = () => {
  const dispatch = useDispatch()
  const currentTheme = useSelector((state) => state.Themes.theme)

  return (
    <>
      {currentTheme === 'dark' ? (
        <IconButton size="medium" onClick={() => dispatch(setTheme('light'))}>
          <LightModeIcon fontSize="inherit" />
        </IconButton>
      ) : (
        <IconButton size="medium" onClick={() => dispatch(setTheme('dark'))}>
          <DarkModeIcon fontSize="inherit" />
        </IconButton>
      )}
    </>
  )
}

export default SwitchTheme
