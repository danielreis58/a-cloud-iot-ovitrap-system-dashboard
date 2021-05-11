import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { withTranslation } from 'react-i18next'
import { Container, Grid, Paper } from '@material-ui/core'
import { LockRounded as LockIcon } from '@material-ui/icons'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from './LoginSchema'

import TextField from '../../components/atoms/inputs/textfield'
import CheckBox from '../../components/atoms/inputs/checkbox'
import Button from '../../components/atoms/inputs/button'
import Typography from '../../components/atoms/display/typography'
import CircularProgress from '../../components/atoms/feedback/circularProgress'
import Snackbar from '../../components/atoms/feedback/snackbar'
import SwitchLanguage from '../../components/molecules/switchs/language'
import SwitchTheme from '../../components/molecules/switchs/theme'

const Login = ({ t }) => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(schema)
  })
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleSubmit = (e) => {
    console.log(e)
    localStorage.setItem('rememberMe', e.rememberMe ?? false)
  }

  const handleForm = (target, value) => {
    setValue(target, value, {
      shouldValidate: !!value
    })
  }

  return (
    <div>
      <Container>
        <div style={{ height: 84 }} />
        <Grid container direction="row" spacing={2} justify="center">
          <Grid item xl={4} lg={4} md={6} sm={8} xs={12}>
            <Paper elevation={12}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 120
                }}
              >
                <img src="/logo.svg" alt="Ovitrap" width="180" height="56" />
              </div>
              <div style={{ padding: 50 }}>
                <form onSubmit={onSubmit(handleSubmit)}>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <TextField
                        {...register('email')}
                        label={t('fields.email.label')}
                        placeholder={t('fields.email.placeHolder')}
                        color="primary"
                        variant="outlined"
                        shrink={true}
                        fullWidth={true}
                        error={!!errors?.email?.message}
                        helperText={
                          errors?.email?.message &&
                          t(`fields.email.errors.${errors.email.message}`)
                        }
                        onChange={(e) => handleForm('email', e.target.value)}
                      />
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <TextField
                        {...register('password')}
                        label={t('fields.password.label')}
                        placeholder={t('fields.password.placeHolder')}
                        color="primary"
                        variant="outlined"
                        shrink={true}
                        fullWidth={true}
                        type="password"
                        error={!!errors?.password?.message}
                        helperText={
                          errors?.password?.message &&
                          t(`fields.password.errors.${errors.password.message}`)
                        }
                        onChange={(e) => handleForm('password', e.target.value)}
                      />
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <CheckBox
                        color="primary"
                        label={t('fields.rememberMe.label')}
                        onChange={(e) => {
                          handleForm('rememberMe', e.target.checked)
                        }}
                      />
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Button
                        type="submit"
                        size="large"
                        variant="contained"
                        color="primary"
                        fullWidth={true}
                        disabled={loading}
                      >
                        {loading ? (
                          <CircularProgress size={25} color="inherit" />
                        ) : (
                          t('buttons.login')
                        )}
                      </Button>
                    </Grid>

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Button
                        size="large"
                        color="primary"
                        fullWidth={true}
                        startIcon={<LockIcon color="primary" />}
                        component={RouterLink}
                        to="/password-recover"
                      >
                        {t('buttons.forgotYourPassword')}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Paper>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 25
              }}
            >
              <Typography variant="body1">
                © {new Date().getFullYear()} {t('app.copyright')}
              </Typography>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 5
              }}
            >
              <SwitchLanguage />
              <div style={{ width: 10 }} />
              <SwitchTheme />
            </div>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={snackbar}
        onClose={() => setSnackbar(false)}
        autoHideDuration={3000}
        message={snackbarMessage}
      />
    </div>
  )
}

export default withTranslation()(Login)
