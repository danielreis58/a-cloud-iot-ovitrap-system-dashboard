import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  iconDetail: {
    width: 72,
    height: 72,
    marginBottom: 10,
    borderRadius: 36,
    backgroundColor: theme.palette.details2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& > *': {
      fontSize: 32,
      color: theme.palette.background.paper,
    },
  },
  text: {
    color: theme.palette.details2,
  },
}))

export default useStyles
