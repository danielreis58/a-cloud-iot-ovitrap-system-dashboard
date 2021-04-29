import React, { memo } from 'react'
import { Slider as MaterialSlider } from '@material-ui/core'
import { withStyles, useTheme } from '@material-ui/core/styles'

const Slider = (props) => {
  const CustomSlider = withStyles((theme) => ({
    root: {
      color: theme.palette.primary.main,
      height: 3,
    },
    thumb: {
      height: 18,
      width: 18,
      backgroundColor: theme.palette.primary.main,
      marginTop: -8,
      // marginLeft: -12,
      boxShadow: theme.shadows[2],
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 3,
      borderRadius: 3,
    },
    rail: {
      height: 3,
      borderRadius: 3,
    },
  }))(MaterialSlider)

  const theme = useTheme()

  return (
    <>
      <CustomSlider
        max={props.max}
        min={props.min}
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      />
    </>
  )
}

export default memo(Slider)
