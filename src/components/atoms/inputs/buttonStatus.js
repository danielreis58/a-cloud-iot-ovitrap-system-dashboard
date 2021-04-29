import React from 'react'
import { useSelector } from 'react-redux'

import { Divider, CircularProgress } from '@material-ui/core'

import {
  Brightness1 as FullIcon,
  ChevronRightRounded as ArrowRightIcon
} from '@material-ui/icons'

import { useTheme } from '@material-ui/core/styles'

import Typography from '../display/typography'

import useStyles from './buttonStatusStyle'

const ButtonStatus = (props) => {
  const theme = useTheme()
  const reason = useSelector((state) => state.reason)

  const useStylesParams = {
    active: props.active
  }
  const classes = useStyles(useStylesParams)

  const renderPanel = () => (
    <>
      <div className={classes.panel} onClick={props.onClick}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <FullIcon
            style={{
              fontSize: 12,
              color: theme.palette.status[props.status],
              marginRight: 10
            }}
          />
          {props.loading && (
            <CircularProgress
              size={16}
              style={{
                color: theme.palette.status[props.status],
                position: 'absolute',
                marginLeft: -2
              }}
            />
          )}
          <Typography
            variant="body1"
            style={{
              color: props.active ? '#fff' : theme.palette.primary.secondary
            }}
          >
            {props.children}
          </Typography>
          {props.more && (
            <ArrowRightIcon
              style={{
                position: 'absolute',
                right: 25,
                color: props.active && '#fff'
              }}
            />
          )}
        </div>
        {reason && props.active && (
          <>
            <div style={{ height: 5 }} />
            <Divider />
            <div style={{ height: 5 }} />
            <Typography
              variant="body2"
              style={{
                color: theme.palette.hover4
              }}
            >
              {reason}
            </Typography>
          </>
        )}
      </div>
    </>
  )

  return <>{renderPanel()}</>
}

export default ButtonStatus
