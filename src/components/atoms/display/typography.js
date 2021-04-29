import React from 'react'

import { Typography as MaterialTypography } from '@material-ui/core'

const Typography = (props) => (
  <>
    <MaterialTypography
      variant={props.variant}
      align={props.align}
      component={props.component}
      display={props.display}
      gutterBottom={props.gutterBottom}
      noWrap={props.noWrap}
      style={props.style}
      color={props.color}
      className={props.className}
    >
      {props.children}
    </MaterialTypography>
  </>
)

export default Typography
