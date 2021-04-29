import React from 'react'
import { withTranslation, useTranslation } from 'react-i18next'
import { useTheme } from '@material-ui/core/styles'
import { PersonRounded as PersonIcon } from '@material-ui/icons'

import { isFunction } from '../../../utils/customMethods'

import Typography from './typography'

import useStyles from './itemListHistoryStyle'

const ItemListHistory = (props) => {
  const { t } = useTranslation()
  const theme = useTheme()

  const classes = useStyles()

  return (
    <>
      <div
        className={props.active ? classes.rootActive : classes.root}
        onClick={(e) => {
          isFunction(props?.onClick) && props.onClick(e)
        }}
      >
        <Typography
          variant="body1"
          className={props.active ? classes.titleActive : classes.title}
        >
          {props.title}
        </Typography>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <PersonIcon
            style={{
              fontSize: 14,
              marginRight: 5,
              marginLeft: -3,
              color: theme.palette.hover4,
            }}
          />
          <Typography variant="body2" className={classes.subtitle}>
            {props.subtitle}
          </Typography>
        </div>
      </div>
    </>
  )
}

export default withTranslation()(ItemListHistory)
