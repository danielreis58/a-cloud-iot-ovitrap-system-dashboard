import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@material-ui/core/'
import { CloseRounded as CloseIcon } from '@material-ui/icons'

import { isArray, isFunction } from '../../../utils/customMethods'

const Delete = (props) => {
  const { t } = useTranslation()
  const { isOpen } = props

  const handleClose = (e) => {
    e.stopPropagation()
    if (isFunction(props.handleCancel)) {
      props.handleCancel()
    }
  }

  const handleConfirm = (e) => {
    e.stopPropagation()
    if (isFunction(props.handleConfirm)) {
      props.handleConfirm(props.data)
    }
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={isOpen}
    >
      <DialogTitle id="form-dialog-title">
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>{t('commons.delete')}</div>
          <div>
            <IconButton onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </DialogTitle>
      <DialogContent>
        {isArray(props.data) &&
          props.data.map((e, key) => (
            <Typography key={key} variant="body1">
              {e.name}
            </Typography>
          ))}
      </DialogContent>
      <DialogActions>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <Button variant="contained" onClick={handleClose}>
              {t('commons.cancel')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirm}
              style={{ marginLeft: 5 }}
            >
              {t('commons.confirm')}
            </Button>
          </div>
        </div>
      </DialogActions>
    </Dialog>
  )
}

export default Delete
