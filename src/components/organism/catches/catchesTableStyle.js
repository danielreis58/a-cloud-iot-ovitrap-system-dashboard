import { makeStyles } from '@material-ui/core/styles'
import Theme from '../../../store/theme/reducer'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-table',
    width: '100%',
    height: '100%'
  },
  container: {
    overflow: 'auto',
    height: '100%'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  notFound: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center'
  },
  totalColumn: {
    '& .total': {
      alignSelf: 'center'
    },
    '& .catch': {
      display: 'flex',
      color: theme.palette.success.main,
      fontSize: '1.5em'
    }
  },
  head: {
    '& .MuiTableCell-stickyHeader': {
      backgroundColor: theme.palette.background.paper
    }
  }
}))

export default useStyles
