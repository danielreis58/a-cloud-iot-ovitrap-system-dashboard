import React, { memo } from 'react'

import { IconButton as IconButtonMaterial } from '@material-ui/core'

import useStyles from './iconButtonStyle'

const IconButton = (props) => {
  const classes = useStyles()
  return (
    <>
      <IconButtonMaterial
        className={props.active && classes.active}
        color={props.color}
        disabled={props.disabled}
        disableFocusRipple={props.disableFocusRipple}
        disableRipple={props.disableRipple}
        component={props.component}
        edge={props.edge}
        size={props.size}
        style={props.style}
        onClick={props.onClick}
      >
        {props.children}
      </IconButtonMaterial>
    </>
  )
}

export default memo(IconButton)
