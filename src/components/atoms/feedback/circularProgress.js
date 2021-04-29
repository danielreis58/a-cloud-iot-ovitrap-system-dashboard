import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import { CircularProgress as MaterialCircularProgress } from '@material-ui/core'

const CircularProgress = (props) => {
  const CustomCircularProgress = withStyles((theme) => ({
    circleDeterminate: {
      color: theme.palette.status[props.status]
    },
    circleIndeterminate: {
      color: theme.palette.status[props.status]
    }
  }))(MaterialCircularProgress)

  return (
    <>
      <CustomCircularProgress
        color={props.color}
        size={props.size}
        thickness={props.thickness}
        disableShrink={props.disableShrink}
        value={props.variant === 'determinate' ? 100 : props.value}
        style={props.style}
        variant={props.variant}
      />
    </>
  )
}

export default CircularProgress
