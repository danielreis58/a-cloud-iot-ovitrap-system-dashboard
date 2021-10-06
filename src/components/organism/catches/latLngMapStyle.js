import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  infoWindow: {
    paddingTop: 200
  },
  makerTooltip: {
    color: theme.palette.icon
  },
  map: {
    display: 'flex',
    height: '100px',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}))

export default useStyles
