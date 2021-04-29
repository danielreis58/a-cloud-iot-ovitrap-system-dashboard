import React from 'react'

import Typography from './typography'

import useStyles from './iconStyle'

const Icon = (props) => {
  const classes = useStyles()

  const withText = () => {
    return (
      <>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
          }}
          ref={props.ref}
          onClick={props.onClick}
        >
          <div className={classes.root}>{props.children}</div>
          <div style={{ width: 10 }} />
          <div>
            <Typography
              variant="subtitle2"
              style={{ color: props.color && props.color }}
            >
              {props.text}
            </Typography>
          </div>
        </div>
      </>
    )
  }

  const withoutText = () => {
    return (
      <>
        <div className={classes.root} onClick={props.onClick} ref={props.ref}>
          {props.children}
        </div>
      </>
    )
  }

  return <>{props.text ? withText() : withoutText()}</>
}

export default Icon
