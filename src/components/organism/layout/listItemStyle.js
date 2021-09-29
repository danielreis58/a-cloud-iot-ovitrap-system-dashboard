import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  leftSibarItem: {
    paddingLeft: 25
  },
  leftSibarIcon: {
    marginRight: 7
  },
  isActive: {
    color: theme.palette.background.default
  }
}))

export default useStyles
