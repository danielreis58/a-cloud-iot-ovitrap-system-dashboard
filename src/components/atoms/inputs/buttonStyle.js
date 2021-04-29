import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: (useStylesParams) => useStylesParams.borderType
  }
}))

export default useStyles
