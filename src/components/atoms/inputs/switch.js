import React from 'react'

import { Switch as MaterialSwitch } from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles'

const Switch = (props) => {
  const SwitchStyled = withStyles((theme) => ({
    root: {
      width: 50,
      height: 24,
      padding: 0,
      margin: 0
    },
    switchBase: {
      transition: '0.3s ease-in-out',
      padding: 2,
      '&$checked': {
        transform: 'translateX(26px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: theme.palette.primary.main,
          opacity: 1,
          border: 'none'
        }
      }
    },
    thumb: {
      backgroundColor: '#fff',
      width: 20,
      height: 20,
      border: 'none'
    },
    track: {
      borderRadius: 12,
      backgroundColor: theme.palette.primary.secondary,
      opacity: 1,
      border: 'none'
    },
    checked: {},
    focusVisible: {}
  }))(({ classes }) => (
    <MaterialSwitch
      focusVisibleClassName={classes.focusVisible}
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked
      }}
      {...props}
    />
  ))

  return (
    <>
      <SwitchStyled
        checked={props.checked}
        onChange={props.onChange}
        name={props.name}
        disabled={props.disabled}
        disableRipple={true}
      />
    </>
  )
}

export default Switch
