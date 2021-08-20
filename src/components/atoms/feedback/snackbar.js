import React from 'react'

import { Snackbar as MaterialSnackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

const Snackbar = (props) => (
  <>
    <MaterialSnackbar
      anchorOrigin={props.anchorOrigin}
      open={props?.open ?? true}
      onClose={props.onClose}
      autoHideDuration={props?.autoHideDuration ?? 3000}
      message={props.message}
    >
      <Alert
        onClose={props.onClose}
        elevation={props.elevation}
        variant={props?.variant}
        severity={props?.severity ?? 'info'}
      >
        {props.message}
      </Alert>
    </MaterialSnackbar>
  </>
)

export default Snackbar
