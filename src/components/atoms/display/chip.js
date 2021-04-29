import React from 'react'

import { useTheme } from '@material-ui/core/styles'

import Typography from './typography'

import useStyles from './chipStyle'

const Chip = (props) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <>
      <div
        className={classes.root}
        style={{ backgroundColor: theme.palette.myChip[props.color] }}
      >
        <span className={'escapeDragScroll'} style={{ cursor: 'text' }}>
          <Typography variant="body1" style={{ color: '#fff' }}>
            {props.text}
          </Typography>
        </span>
      </div>
    </>
  )
}

export default React.memo(Chip)
