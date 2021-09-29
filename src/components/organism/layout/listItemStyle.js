import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  leftSibarItem: {
    paddingLeft: 16,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 24
    }
  },
  leftSibarIcon: {
    marginRight: 7,
    [theme.breakpoints.up('sm')]: {
      marginRight: 7
    }
  },
  isActive: {
    color: theme.palette.background.default
  }
}))

export default useStyles
