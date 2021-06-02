import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { withTranslation } from 'react-i18next'
import ListItem from '@material-ui/core/ListItem'
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
        <ListItemText primary={t('Dashboard')} />
      </ListItem>
      <ListItem button>
        <ListItemIcon className={classes.leftSibarIcon}>
          <Domain />
        </ListItemIcon>
        <ListItemText primary={t('Company')} />
      </ListItem>
      <ListItem button>
        <ListItemIcon className={classes.leftSibarIcon}>
          <People />
        </ListItemIcon>
        <ListItemText primary={t('Users')} />
      </ListItem>
      <ListItem button>
        <ListItemIcon className={classes.leftSibarIcon}>
          <MosquitoIcon />
        </ListItemIcon>
        <ListItemText primary={t('Ovitraps')} />
      </ListItem>
    </>
  )
}

export default withTranslation()(MainListItems)
