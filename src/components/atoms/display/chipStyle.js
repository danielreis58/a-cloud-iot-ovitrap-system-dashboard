import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 32,
    borderRadius: theme.shape.borderRadius,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 5,
    wordWrap: 'normal',
    flexWrap: 'wrap',
    boxShadow: theme.shadows[1],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    float: 'left',
  },
}))

export default useStyles
