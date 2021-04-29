import React from 'react'

import { Snackbar as MaterialSnackbar } from '@material-ui/core'

const Snackbar = (props) => (
  <>
    <MaterialSnackbar
      anchorOrigin={props.anchorOrigin}
      open={props.open}
      onClose={props.onClose}
      autoHideDuration={props.autoHideDuration ? props.autoHideDuration : 3000}
      message={props.message}
    />
  </>
)

export default Snackbar
