import { makeStyles } from '@material-ui/core/styles'
import { Height } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  field: {
    width: '100%',
    minHeight: '85px',
    paddingTop: '5px'
  },
  footer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  }
}))
export default useStyles
