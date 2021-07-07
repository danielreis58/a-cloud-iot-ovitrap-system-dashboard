import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@material-ui/core'

import useStyles from './buttonsStyle'
import { isFunction } from '../../../utils/customMethods'

const Buttons = (props) => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        variant="contained"
        onClick={() => isFunction(props?.handleCancel) && props.handleCancel()}
      >
        {t('commons.cancel')}
      </Button>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={() =>
          isFunction(props?.handleConfirm) && props.handleConfirm()
        }
      >
        {t('commons.confirm')}
      </Button>
    </div>
  )
}

export default Buttons
