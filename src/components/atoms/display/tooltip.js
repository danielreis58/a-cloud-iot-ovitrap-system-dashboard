import React, { memo, useCallback } from 'react'
import ReactHtmlParser from 'html-react-parser'

import { Tooltip as MaterialTooltip, Divider } from '@material-ui/core'

import { withStyles, useTheme } from '@material-ui/core/styles'

import Typography from './typography'

const Tooltip = (props) => {
  const CustomTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.secondary,
      boxShadow: theme.shadows[2],
      padding: 15,
      paddingTop: props.title && !props.subtitle ? 10 : 15,
      paddingBottom: props.title && !props.subtitle ? 10 : 15,
    },
    arrow: {
      color: theme.palette.common.white,
    },
  }))(MaterialTooltip)

  const theme = useTheme()

  const renderContent = useCallback(() => {
    return (
      <>
        {props.title && (
          <Typography
            variant="body1"
            style={{
              color: theme.palette.primary.secondary,
              fontSize: theme.typography.fontSize - 2,
              fontWeight: props.subtitle
                ? theme.typography.fontWeightBold
                : theme.typography.fontWeightRegular,
            }}
          >
            {props.title}
          </Typography>
        )}

        {props.title && props.subtitle && (
          <Divider style={{ marginTop: 5, marginBottom: 5 }} />
        )}

        {props.subtitle && (
          <Typography
            variant="body1"
            style={{
              color: theme.palette.primary.secondary,
              fontSize: theme.typography.fontSize - 2,
            }}
          >
            {ReactHtmlParser(props.subtitle)}
          </Typography>
        )}
      </>
    )
  }, [props?.title, props?.subtitle])

  return props?.title || props?.subtitle ? (
    <CustomTooltip
      placement={props.placement}
      arrow
      title={<React.Fragment>{renderContent()}</React.Fragment>}
    >
      {props.children}
    </CustomTooltip>
  ) : (
    props.children
  )
}

export default memo(Tooltip)
