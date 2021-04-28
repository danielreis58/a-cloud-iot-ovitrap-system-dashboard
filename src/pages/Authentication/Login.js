import { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { withTranslation } from 'react-i18next'

const Login = ({ t }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({})
  const [formError, setFormError] = useState({})
  const [snackbar, setSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  useEffect(() => {
    if (localStorage.getItem('rememberMe')) {
      setForm((prev) => ({
        ...prev,
        email: localStorage.getItem('rememberMe'),
        rememberMe: 'checked'
      }))
    }
  }, [])

  const inputHandle = (event) => {
    event.persist()
    setForm((prev) => ({
      ...prev,
      [event?.target?.name]: event?.target?.value
    }))
  }

  const handleRememberMeChange = (event) => {
    event.persist()
    setForm((prev) => ({ ...prev, rememberMe: event?.target?.checked }))
  }

  const submit = () => {
    setFormError({})
    setLoading(true)
    console.log('LOGIN')
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
                  height: 120,
                  backgroundColor: '#f6f6f6'
                }}
              >
                <img src="/logo.png" alt="Porto" width="180" height="56" />
              </div>
              <div style={{ padding: 50 }}>
                <Grid container direction="row" spacing={2}>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      id="field-email"
                      label={t('fields.email.label')}
                      placeholder={t('fields.email.placeHolder')}
                      type="email"
                      color="primary"
                      variant="outlined"
                      name="email"
                      value={form.email ? form.email : ''}
                      onChange={inputHandle}
                      error={!!formError?.email}
                      helperText={
                        formError?.email &&
                        t(`fields.email.errors.${formError.email}`)
                      }
                      shrink={true}
                      fullWidth={true}
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      id="field-password"
                      label={t('fields.password.label')}
                      placeholder={t('fields.password.placeHolder')}
                      type="password"
                      color="primary"
                      variant="outlined"
                      name="password"
                      value={form.password ? form.password : ''}
                      onChange={inputHandle}
                      error={!!formError?.password}
                      helperText={
                        formError?.password &&
                        t(`fields.password.errors.${formError.password}`)
                      }
                      shrink={true}
                      fullWidth={true}
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <CheckBox
                      checked={form.rememberMe ? form.rememberMe : false}
                      onChange={handleRememberMeChange}
                      name="rememberMe"
                      color="primary"
                      label={t('fields.rememberMe.label')}
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Button
                      size="large"
                      variant="contained"
                      color="primary"
                      fullWidth={true}
                      onClick={() => submit()}
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress size={25} color="inherit" />
                      ) : (
                        t('buttons.accessService')
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
