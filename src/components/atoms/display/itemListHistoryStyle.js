import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor:
      theme.palette.type === 'dark' ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0)',
    cursor: 'pointer',
    borderRadius: theme.shape.borderRadius,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      backgroundColor: theme.palette.divider,
    },
  },
  rootActive: {
    width: '100%',
    backgroundColor:
      theme.palette.type === 'dark' ? '#fff' : theme.palette.primary.secondary,
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    borderRadius: theme.shape.borderRadius,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title: {
    color:
      theme.palette.type === 'dark' ? '#fff' : theme.palette.primary.secondary,
  },
  titleActive: {
    color:
      theme.palette.type === 'dark' ? theme.palette.primary.secondary : '#fff',
  },
  subtitle: {
    color: theme.palette.hover4,
  },
}))

export default useStyles
