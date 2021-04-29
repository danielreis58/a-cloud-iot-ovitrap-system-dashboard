import React from 'react'
import { useSnackbar } from 'notistack'

const toast = (props) => {
  const { enqueueSnackbar } = useSnackbar()
  return enqueueSnackbar(message, { type })
}

export default toast
