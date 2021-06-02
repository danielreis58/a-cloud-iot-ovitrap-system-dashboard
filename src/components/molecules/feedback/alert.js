import React from 'react'
import { useTranslation } from 'react-i18next'

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  CircularProgress
} from '@material-ui/core'

import { CloseRounded as CloseIcon } from '@material-ui/icons'

import { useTheme } from '@material-ui/core/styles'

import Typography from '../../atoms/display/typography'

const Alert = (props) => {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={!!props.open}
        disableBackdropClick={props.disableBackdropClick}
        onClose={() => props.open(false)}
        aria-labelledby="form-dialog-title"
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
            <div>{props.title}</div>
            <div>
              <IconButton
                onClick={() => props.open(false)}
                style={{ color: theme.palette.primary.main }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">{props.text}</Typography>
          {props.children}
        </DialogContent>
        <DialogActions>
          <Button
            size="large"
            color="primary"
            onClick={() => props.open(false)}
          >
            {props.disagreeText ? props.disagreeText : t('buttons.no')}
          </Button>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => props.agreeAction()}
            disabled={props.loading}
          >
            {props.loading ? (
              <CircularProgress size={25} color="primary" />
            ) : (
              props.agreeText || t('buttons.yes')
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default React.memo(Alert)
