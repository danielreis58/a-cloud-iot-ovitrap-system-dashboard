import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { withTranslation } from 'react-i18next'
import ListItem from '@material-ui/core/ListItem'
import SvgIcon from '@material-ui/core/SvgIcon'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import Domain from '@material-ui/icons/Domain'
import People from '@material-ui/icons/People'
import MosquitoIcon from '../../assets/icons/mosquitoIcon'

const useStyles = makeStyles((theme) => ({
  leftSibarIcon: {
    marginRight: 6
  }
}))

const MainListItems = ({ t }) => {
  const classes = useStyles()
  return (
    <>
      <ListItem button>
        <ListItemIcon className={classes.leftSibarIcon}>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary={t('leftMenuList.dashboard')} />
      </ListItem>
      <ListItem button>
        <ListItemIcon className={classes.leftSibarIcon}>
          <Domain />
        </ListItemIcon>
        <ListItemText primary={t('leftMenuList.companies')} />
      </ListItem>
      <ListItem button>
        <ListItemIcon className={classes.leftSibarIcon}>
          <People />
        </ListItemIcon>
        <ListItemText primary={t('leftMenuList.users')} />
      </ListItem>
      <ListItem button>
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
