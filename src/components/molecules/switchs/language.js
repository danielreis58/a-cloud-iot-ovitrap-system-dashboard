import React from 'react'
import { withTranslation } from 'react-i18next'
import { Menu, MenuItem } from '@material-ui/core'
import { LanguageRounded as LanguageIcon } from '@material-ui/icons'

import i18n from '../../../i18n'
import IconButton from '../../atoms/inputs/iconButton'

const Language = ({ t }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [menuLanguage, setMenuLanguage] = React.useState(false)

  const handleOpenMenuLanguage = (event) => {
    setAnchorEl(event.currentTarget)
    setMenuLanguage(true)
  }

  return (
    <>
      <IconButton
        size="medium"
        onClick={(event) => handleOpenMenuLanguage(event)}
      >
        <LanguageIcon fontSize="inherit" />
      </IconButton>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={menuLanguage}
        onClose={() => setMenuLanguage(false)}
      >
        <MenuItem
          onClick={() => {
            i18n.changeLanguage('en-US', () => setMenuLanguage(false))
          }}
        >
          {t('translations.english')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            i18n.changeLanguage('pt-BR', () => setMenuLanguage(false))
          }}
        >
          {t('translations.portuguese')}
        </MenuItem>
      </Menu>
    </>
  )
}

export default withTranslation()(Language)
