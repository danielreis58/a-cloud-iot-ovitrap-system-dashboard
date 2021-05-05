import React from 'react'

import { Button as MaterialButton } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

import useStyles from './buttonStyle'

const Button = (props) => {
  const theme = useTheme()

  const borderType = () => {
    let borderRadius
    switch (props.border) {
      case 'rounded':
        borderRadius = 24
        break
      default:
        borderRadius = theme.shape.borderRadius
        break
    }
    return borderRadius
  }

  const useStylesParams = {
    borderType
  }
  const classes = useStyles(useStylesParams)

  return (
    <>
      <MaterialButton
        size={props.size}
        variant={props.variant}
        color={props.color}
        fullWidth={props.fullWidth}
        startIcon={props.startIcon}
        endIcon={props.endIcon}
        disabled={props.disabled}
        component={props.component}
        to={props.to}
        className={classes.root}
        style={props.style && props.style}
        onClick={props.onClick}
        type={props.type}
      >
        {props.children}
      </MaterialButton>
    </>
  )
}

export default React.memo(Button)
