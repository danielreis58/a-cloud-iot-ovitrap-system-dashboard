import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  panel: {
    width: '100%',
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    cursor: 'pointer',
    backgroundColor: (useStylesParams) =>
      useStylesParams.active ? theme.palette.primary.secondary : 'transparent',
    borderRadius: theme.shape.borderRadius,
    border: (useStylesParams) =>
      useStylesParams.active
        ? `1px solid ${theme.palette.primary.secondary}`
        : `1px solid ${theme.palette.divider}`,
    '& > *': {
      color: (useStylesParams) =>
        useStylesParams.active ? '#fff' : theme.palette.primary.secondary
    },
    '&:hover': {
      backgroundColor: (useStylesParams) =>
        useStylesParams.active
          ? theme.palette.primary.secondary
          : theme.palette.divider
    }
  }
}))

export default useStyles
