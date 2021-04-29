import React from 'react'

import { Badge as MaterialBadge } from '@material-ui/core'

const Badge = (props) => {
  return (
    <>
      <MaterialBadge
        anchorOrigin={props.anchorOrigin}
        badgeContent={props.badgeContent}
        color={props.color}
        component={props.component}
        invisible={props.invisible}
        max={props.max}
        overlap={props.overlap}
        showZero={props.showZero}
        variant={props.variant}
        style={props.style}
      >
        {props.children}
      </MaterialBadge>
    </>
  )
}

export default Badge
