import React from 'react'

import Typography from './typography'

import useStyles from './emptyStateStyle'

const EmptyState = (props) => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.root}>
        <div className={classes.iconDetail}>{props.children}</div>
        <Typography variant="body1" className={classes.text}>
          {props.text}
        </Typography>
      </div>
    </>
  )
}

export default React.memo(EmptyState)
