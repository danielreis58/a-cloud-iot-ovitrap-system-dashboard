import React from 'react'

import { Alert as MaterialAlert } from '@material-ui/lab'

const Alert = (props) => {
  return (
    <>
      <MaterialAlert
        action={props.action}
        closeText={props.closeText}
        color={props.color}
        icon={props.icon}
        iconMapping={props.iconMapping}
        onClose={props.onClose}
        role={props.role}
        severity={props.severity}
        variant={props.variant}
      >
        {props.children}
      </MaterialAlert>
    </>
  )
}

export default Alert
