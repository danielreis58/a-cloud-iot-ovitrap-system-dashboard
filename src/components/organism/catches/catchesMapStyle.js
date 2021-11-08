import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  infoWindow: {
    paddingTop: 200
  },
  makerTooltip: {
    color: theme.palette.icon
  },
  catchTooltip: {
    display: 'flex',
    '& .gm-ui-hover-effect': {
      display: 'none !important'
    },
    '& .gm-style .gm-style-iw + div': {
      display: 'none',
      visibility: 'hidden',
      opacity: 0
    }
  }
}))

export default useStyles
