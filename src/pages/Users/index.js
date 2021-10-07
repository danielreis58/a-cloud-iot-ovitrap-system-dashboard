import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Paper,
  Grid,
  Select,
  MenuItem,
  OutlinedInput,
  InputLabel,
  FormControl,
  FormHelperText
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTheme } from '@material-ui/core/styles'

import { isArray } from 'lodash'
import { objToArray } from '../../utils/customMethods'

import TextField from '../../components/atoms/inputs/textfield'
import FooterButtons from '../../components/molecules/footer/buttons'
import Delete from '../../components/organism/dialogs/delete'
import TablePanel from '../../components/organism/panels/tablePanel'
import Snackbar from '../../components/atoms/feedback/snackbar'
import useStyles from './indexStyle'

import schema from './schema'

import {
  createData,
  readData,
  updateData,
  deleteData,
  setData
} from '../../store/users/actions'

const Users = () => {
  const theme = useTheme()
  const classes = useStyles()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const { profile = {}, companyId } = useSelector((state) => state.Login.data)

  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)

  const toggleEdit = () => setIsOpenEdit((prev) => !prev)
  const toggleDelete = () => setIsOpenDelete((prev) => !prev)

  /* ------------------------------------- VARIABLES -------------------------------------  */

  const { data, form, page, rowsPerPage, dense, success, error } = useSelector(
    (state) => state.Users
  )
  const rows = objToArray(data)

  const columns = [
    {
      id: 'name',
      label: t('users.name.label')
    },
    {
      id: 'email',
      label: t('users.email.label')
    },
    {
      id: 'nickname',
      label: t('users.nickname.label')
    },
    {
      id: 'profile_id',
      label: t('users.profile_id.label')
    },
    {
      id: 'action',
      label: t('commons.action')
    }
  ]

  if (profile.isAdmin) {
    columns.splice(4, 0, {
      id: 'company_id',
      label: t('ovitraps.company_id.label')
    })
  }

  const initialState = {
    id: null,
    name: '',
    email: '',
    nickname: '',
    profile_id: null,
    company_id: !profile.isAdmin ? companyId : companyId
  }

  /* -------------------------------------------------------------------------------------  */

  const [select, setSelected] = useState(initialState)

  const handleEditCreate = (e) => {
    toggleEdit()
    if (e?.id) {
      dispatch(updateData(e))
    } else {
      dispatch(createData(e))
    }
  }
  const handleDelete = () => {
    toggleDelete()
    const ids = select.map((e) => e.id)
    dispatch(deleteData(ids))
    setSelected(initialState)
  }

  const openEdit = (e) => {
    toggleEdit()
    if (e) {
      setSelected(e)
    } else {
      setSelected(initialState)
    }
  }
  const openDelete = (e) => {
    toggleDelete()
    setSelected(e)
  }

  useEffect(() => {
    reset(select)
  }, [select])

  useEffect(() => {
    dispatch(readData())
  }, [])

  const handleCloseSnackBar = () => {
    dispatch(setData({ success: false, error: false }))
  }

  return (
    <>
      {isOpenEdit ? (
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <form onSubmit={handleSubmit(handleEditCreate)}>
              {/* ------------------------------------- VARIABLES -------------------------------------  */}
              <Grid container spacing={2}>
                <Grid container item xs={12} sm={6}>
                  <div className={classes.field}>
                    <TextField
                      {...register('name')}
                      label={t('users.name.label')}
                      placeholder={t('users.name.placeholder')}
                      helperText={
                        !!errors?.name?.message &&
                        t(`users.name.errors.${errors?.name?.message}`)
                      }
                      error={!!errors?.name?.message}
                      defaultValue={select.name}
                      onChange={(e) =>
                        setValue('name', e.target.value, {
                          shouldValidate: true
                        })
                      }
                      variant="outlined"
                      fullWidth
                      shrink
                    />
                  </div>
                </Grid>
                <Grid container item xs={12} sm={6}>
                  <div className={classes.field}>
                    <TextField
                      {...register('email')}
                      label={t('users.email.label')}
                      placeholder={t('users.email.placeholder')}
                      helperText={
                        !!errors?.email?.message &&
                        t(`users.email.errors.${errors?.email?.message}`)
                      }
                      error={!!errors?.email?.message}
                      defaultValue={select.email}
                      onChange={(e) =>
                        setValue('email', e.target.value, {
                          shouldValidate: true
                        })
                      }
                      variant="outlined"
                      fullWidth
                      shrink
                    />
                  </div>
                </Grid>
                <Grid container item xs={12} sm={6}>
                  <div className={classes.field}>
                    <TextField
                      {...register('nickname')}
                      label={t('users.nickname.label')}
                      placeholder={t('users.nickname.placeholder')}
                      helperText={
                        !!errors?.nickname?.message &&
                        t(`users.nickname.errors.${errors?.nickname?.message}`)
                      }
                      error={!!errors?.nickname?.message}
                      defaultValue={select.nickname}
                      onChange={(e) =>
                        setValue('nickname', e.target.value, {
                          shouldValidate: true
                        })
                      }
                      variant="outlined"
                      fullWidth
                      shrink
                    />
                  </div>
                </Grid>
                <Grid container item xs={12} sm={6}>
                  <div className={classes.field}>
                    <FormControl
                      fullWidth
                      shrink
                      variant="outlined"
                      error={!!errors?.profile_id?.message}
                    >
                      <InputLabel>{t('users.profile_id.label')}</InputLabel>
                      <Select
                        {...register('profile_id')}
                        defaultValue={select?.profile_id ?? 'empty'}
                        onChange={(e) =>
                          setValue('profile_id', e.target.value, {
                            shouldValidate: true
                          })
                        }
                        input={
                          <OutlinedInput
                            notched
                            label={t('users.profile_id.label')}
                          />
                        }
                      >
                        <MenuItem disabled value="empty">
                          <div style={{ color: theme.palette.placeholder }}>
                            {t('users.profile_id.placeholder')}
                          </div>
                        </MenuItem>
                        {form?.profiles?.map((e) => (
                          <MenuItem key={e.id} value={e.id}>
                            {e.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {!!errors?.profile_id?.message &&
                          t(
                            `users.profile_id.errors.${errors?.profile_id?.message}`
                          )}
                      </FormHelperText>
                    </FormControl>
                  </div>
                </Grid>
              </Grid>
              {profile.isAdmin && (
                <Grid container item xs={12} sm={6}>
                  <div className={classes.field}>
                    <FormControl
                      fullWidth
                      shrink
                      variant="outlined"
                      error={!!errors?.company_id?.message}
                    >
                      <InputLabel>{t('users.company_id.label')}</InputLabel>
                      <Select
                        {...register('company_id')}
                        defaultValue={select?.company_id ?? 'empty'}
                        onChange={(e) =>
                          setValue('company_id', e.target.value, {
                            shouldValidate: true
                          })
                        }
                        input={
                          <OutlinedInput
                            notched
                            label={t('users.company_id.label')}
                          />
                        }
                      >
                        <MenuItem disabled value="empty">
                          <div style={{ color: theme.palette.placeholder }}>
                            {t('users.company_id.placeholder')}
                          </div>
                        </MenuItem>
                        {form?.companies?.map((e) => (
                          <MenuItem key={e.id} value={e.id}>
                            {e.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {!!errors?.company_id?.message &&
                          t(
                            `users.company_id.errors.${errors?.company_id?.message}`
                          )}
                      </FormHelperText>
                    </FormControl>
                  </div>
                </Grid>
              )}
              {/* -------------------------------------------------------------------------------------  */}
              <FooterButtons handleCancel={toggleEdit} />
            </form>
          </Paper>
        </div>
      ) : (
        <TablePanel
          title={t('leftMenuList.users')}
          columns={columns}
          rows={rows}
          page={page}
          rowsPerPage={rowsPerPage}
          dense={dense}
          form={form}
          selected={isArray(select) ? select : []}
          openEdit={openEdit}
          openDelete={openDelete}
          setData={setData}
        />
      )}
      {isOpenDelete && (
        <Delete
          data={select}
          isOpen={isOpenDelete}
          handleCancel={toggleDelete}
          handleConfirm={handleDelete}
        />
      )}
      {(success || error) && (
        <Snackbar
          open={success || error}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          variant="filled"
          elevation={6}
          severity={success ? 'success' : 'error'}
          message={t(
            `toast.users.${success || error}.${success ? 'success' : 'error'}`
          )}
          onClose={handleCloseSnackBar}
        />
      )}
    </>
  )
}

export default Users
