import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.details}`,
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    cursor: 'pointer',
    transition: 'all 200ms ease-in-out',
    '&:hover': {
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
  active: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  bookmark: {
    marginLeft: 5,
    fontSize: 20,
    color: theme.palette.details,
    '&:hover': { color: theme.palette.primary.main, transition: '.2s' },
  },
  bookmarked: { color: theme.palette.primary.main },
}))

export default useStyles
