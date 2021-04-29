import React, { useState, useEffect, useRef, memo } from 'react'

import { Duration } from 'luxon'

import Typography from './typography'

import useStyles from './clockStyle'

const Clock = (props) => {
  const classes = useStyles()

  const [timer, setTimer] = useState(0)
  const interval = useRef(null)

  const handleTimer = (assignedTime, reset, endTime) => {
    setTimer((prev) => {
      return endTime
        ? Math.abs(
            (new Date(endTime).getTime() - new Date(assignedTime).getTime()) /
              1000
          )
        : reset
        ? Math.abs((Date.now() - new Date(assignedTime).getTime()) / 1000)
        : prev + 1
    })
  }

  const renderTimer = () => {
    return Duration.fromObject({
      seconds: timer,
    }).toFormat(timer < 60 ? '00:ss' : timer < 3600 ? 'mm:ss' : 'hh:mm:ss')
  }

  const renderContent = () => props?.queueSize ?? renderTimer()

  useEffect(() => {
    if (props?.chatId && props?.assignedTime) {
      if (interval?.current) clearInterval(interval.current)

      if (!props?.endTime) {
        handleTimer(props.assignedTime, true)
        interval.current = setInterval(
          () => handleTimer(props.assignedTime),
          1000
        )
      } else {
        handleTimer(props.assignedTime, false, props.endTime)
      }
    }
    return () => clearInterval(interval?.current)
  }, [props?.chatId, props?.assignedTime, props?.status])

  return (
    <>
      <div className={classes.root}>
        <Typography variant="h4">{renderContent()}</Typography>
      </div>
    </>
  )
}

export default memo(Clock)
