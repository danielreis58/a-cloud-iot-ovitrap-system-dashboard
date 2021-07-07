import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  footer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginLeft: theme.spacing(2)
  }
}))
export default useStyles
