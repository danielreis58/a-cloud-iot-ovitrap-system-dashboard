import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    height: '100%',
    marginBottom: theme.spacing(1)
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
  },
  notFound: {
    display: 'flex',
    width: '100%',
    height: '100%',
    padding: 20,
    justifyContent: 'center'
  }
}))
export default useStyles
