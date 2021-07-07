import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, DialogTitle, Dialog } from '@material-ui/core/'

const Delete = (props) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(props.isOpen)

  const handleClose = (e) => {
    e.stopPropagation()
    setOpen(false)
  }

  const handleConfirm = (e) => {
    e.stopPropagation()
    setOpen(false)
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
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
          <div>{t('commons.editName')}</div>
          <div>
            <IconButton
              onClick={handleClose}
              style={{ color: theme.palette.primary.main }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </DialogTitle>
      <DialogContent>CONTENT</DialogContent>
      <DialogActions>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <Button onClick={handleClose}>{t('commons.cancel')}</Button>
            <Button
              size="large"
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
