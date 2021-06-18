import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { withTranslation } from 'react-i18next'
import ListItem from '@material-ui/core/ListItem'
import SvgIcon from '@material-ui/core/SvgIcon'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import Domain from '@material-ui/icons/Domain'
import People from '@material-ui/icons/People'
import MosquitoIcon from '../../../assets/icons/mosquitoIcon'

const useStyles = makeStyles(() => ({
  leftSibarIcon: {
    marginRight: 6
  }
}))

const MainListItems = ({ t }) => {
  const classes = useStyles()
  return (
    <>
      <ListItem button component={Link} to="/dashboard">
        <ListItemIcon className={classes.leftSibarIcon}>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary={t('leftMenuList.dashboard')} />
      </ListItem>
      <ListItem button component={Link} to="/companies">
        <ListItemIcon className={classes.leftSibarIcon}>
          <Domain />
        </ListItemIcon>
        <ListItemText primary={t('leftMenuList.companies')} />
      </ListItem>
      <ListItem button component={Link} to="/users">
        <ListItemIcon className={classes.leftSibarIcon}>
          <People />
        </ListItemIcon>
        <ListItemText primary={t('leftMenuList.users')} />
      </ListItem>
      <ListItem button component={Link} to="/traps">
        <ListItemIcon className={classes.leftSibarIcon}>
          <SvgIcon>
            <MosquitoIcon />
          </SvgIcon>
        </ListItemIcon>
        <ListItemText primary={t('leftMenuList.ovitraps')} />
      </ListItem>
    </>
  )
}

export default withTranslation()(MainListItems)
