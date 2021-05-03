import light from './themeLight'
import dark from './themeDark'

const themes = { light, dark }

export default function getTheme(theme) {
  return themes[theme]
}
