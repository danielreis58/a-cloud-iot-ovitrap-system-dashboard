import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 15,
    paddingRight: 15,
    height: 48,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    alignItems: 'center',
  },
}))

export default useStyles
