import React, { memo } from 'react'

import { Avatar as AvatarMaterial } from '@material-ui/core'

import useStyles from './avatarStyle'

const Avatar = (props) => {
  const classes = useStyles()

  return (
    <>
      <AvatarMaterial
        alt={props.alt}
        component={props.component}
        imgProps={props.imgProps}
        sizes={props.sizes}
        src={props.src}
        srcSet={props.srcSet}
        variant={props.variant}
        className={classes.root}
        style={props.style}
      >
        {props.children}
      </AvatarMaterial>
    </>
  )
}

export default memo(Avatar)
