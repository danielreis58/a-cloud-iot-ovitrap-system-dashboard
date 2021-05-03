import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import getTheme from './themeBase'

const CustomThemeProvider = (props) => {
  const { theme: currentTheme } = useSelector((state) => state.Themes)
  const { children } = props
  const theme = getTheme(currentTheme)

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default CustomThemeProvider
