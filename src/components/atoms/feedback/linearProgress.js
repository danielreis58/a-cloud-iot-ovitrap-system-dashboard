import React from 'react'

import { LinearProgress as MaterialLinearProgress } from '@material-ui/core'

const LinearProgress = (props) => {
  return (
    <>
      <MaterialLinearProgress
        color={props.color}
        value={props.value}
        valueBuffer={props.valueBuffer}
        variant={props.variant}
      />
    </>
  )
}

export default LinearProgress
