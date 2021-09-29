import React from 'react'
import { Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { ListItem, ListItemIcon, SvgIcon, Typography } from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard'
import Domain from '@material-ui/icons/Domain'
import People from '@material-ui/icons/People'
import { useTheme } from '@material-ui/core/styles'
import MosquitoIcon from '../../../assets/icons/mosquitoIcon'
import useStyles from './listItemStyle'

const MainListItems = ({ t }) => {
  const classes = useStyles()
  const theme = useTheme()
  const isActiveDashboard = window.location.pathname === '/dashboard'
  const isActiveCompanies = window.location.pathname === '/companies'
  const isActiveUsers = window.location.pathname === '/users'
  const isActiveOvitraps = window.location.pathname === '/ovitraps'
  return (
    <>
      <ListItem
        button
        className={classes.leftSibarItem}
        component={Link}
        to="/dashboard"
      >
        <ListItemIcon className={classes.leftSibarIcon}>
          <DashboardIcon className={isActiveDashboard && classes.isActive} />
        </ListItemIcon>
        <Typography
          className={isActiveDashboard && classes.isActive}
          variant="button"
        >
          {t('leftMenuList.dashboard')}
        </Typography>
      </ListItem>
      <ListItem
        button
        className={classes.leftSibarItem}
        component={Link}
        to="/companies"
      >
        <ListItemIcon className={classes.leftSibarIcon}>
          <Domain className={isActiveCompanies && classes.isActive} />
        </ListItemIcon>
        <Typography
          className={isActiveCompanies && classes.isActive}
          variant="button"
        >
          {t('leftMenuList.companies')}
        </Typography>
      </ListItem>
      <ListItem
        button
        className={classes.leftSibarItem}
        component={Link}
        to="/users"
      >
        <ListItemIcon className={classes.leftSibarIcon}>
          <People className={isActiveUsers && classes.isActive} />
        </ListItemIcon>
        <Typography
          className={isActiveUsers && classes.isActive}
          variant="button"
        >
          {t('leftMenuList.users')}
        </Typography>
      </ListItem>
      <ListItem
        button
        className={classes.leftSibarItem}
        component={Link}
        to="/ovitraps"
      >
        <ListItemIcon className={classes.leftSibarIcon}>
          <SvgIcon>
            <MosquitoIcon
              fill={isActiveOvitraps && theme.palette.background.default}
            />
          </SvgIcon>
        </ListItemIcon>
        <Typography
          className={isActiveOvitraps && classes.isActive}
          variant="button"
        >
          {t('leftMenuList.ovitraps')}
        </Typography>
      </ListItem>
    </>
  )
}

export default withTranslation()(MainListItems)
