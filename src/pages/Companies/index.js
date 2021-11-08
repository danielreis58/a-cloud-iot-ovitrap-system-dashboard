import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Paper, Grid } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

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
} from '../../store/companies/actions'

const Companies = () => {
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

  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)

  const toggleEdit = () => setIsOpenEdit((prev) => !prev)
  const toggleDelete = () => setIsOpenDelete((prev) => !prev)

  /* ------------------------------------- VARIABLES -------------------------------------  */

  const { data, page, rowsPerPage, dense, success, error } = useSelector(
    (state) => state.Companies
  )
  const rows = objToArray(data)

  const columns = [
    {
      id: 'name',
      label: t('companies.name.label')
    },
    {
      id: 'email',
      label: t('companies.email.label')
    },
    {
      id: 'document',
      label: t('companies.document.label')
    },
    {
      id: 'site',
      label: t('companies.site.label')
    },
    {
      id: 'cep',
      label: t('companies.cep.label')
    },
    {
      id: 'city',
      label: t('companies.city.label')
    },
    {
      id: 'state',
      label: t('companies.state.label')
    },
    {
      id: 'action',
      label: t('commons.action')
    }
  ]

  const initialState = {
    id: null,
    name: '',
    email: '',
    document: '',
    site: '',
    cep: '',
    address: '',
    number: null,
    neighborhood: '',
    city: '',
    state: '',
    note: '',
    telephone: ''
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
                      label={t('companies.name.label')}
                      placeholder={t('companies.name.placeholder')}
                      helperText={
                        !!errors?.name?.message &&
                        t(`companies.name.errors.${errors?.name?.message}`)
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
                      label={t('companies.email.label')}
                      placeholder={t('companies.email.placeholder')}
                      helperText={
                        !!errors?.email?.message &&
                        t(`companies.email.errors.${errors?.email?.message}`)
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
                      {...register('document')}
                      label={t('companies.document.label')}
                      placeholder={t('companies.document.placeholder')}
                      helperText={
                        !!errors?.document?.message &&
                        t(
                          `companies.document.errors.${errors?.document?.message}`
                        )
                      }
                      error={!!errors?.document?.message}
                      defaultValue={select.document}
                      onChange={(e) =>
                        setValue('document', e.target.value, {
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
                      {...register('site')}
                      label={t('companies.site.label')}
                      placeholder={t('companies.site.placeholder')}
                      helperText={
                        !!errors?.site?.message &&
                        t(`companies.site.errors.${errors?.site?.message}`)
                      }
                      error={!!errors?.site?.message}
                      defaultValue={select.site}
                      onChange={(e) =>
                        setValue('site', e.target.value, {
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
                      {...register('cep')}
                      label={t('companies.cep.label')}
                      placeholder={t('companies.cep.placeholder')}
                      helperText={
                        !!errors?.cep?.message &&
                        t(`companies.cep.errors.${errors?.cep?.message}`)
                      }
                      error={!!errors?.cep?.message}
                      defaultValue={select.cep}
                      onChange={(e) =>
                        setValue('cep', e.target.value, {
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
                      {...register('address')}
                      label={t('companies.address.label')}
                      placeholder={t('companies.address.placeholder')}
                      helperText={
                        !!errors?.address?.message &&
                        t(
                          `companies.address.errors.${errors?.address?.message}`
                        )
                      }
                      error={!!errors?.address?.message}
                      defaultValue={select.address}
                      onChange={(e) =>
                        setValue('address', e.target.value, {
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
                      {...register('number')}
                      label={t('companies.number.label')}
                      placeholder={t('companies.number.placeholder')}
                      helperText={
                        !!errors?.number?.message &&
                        t(`companies.number.errors.${errors?.number?.message}`)
                      }
                      error={!!errors?.number?.message}
                      defaultValue={select.number}
                      onChange={(e) =>
                        setValue('number', e.target.value, {
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
                      {...register('neighborhood')}
                      label={t('companies.neighborhood.label')}
                      placeholder={t('companies.neighborhood.placeholder')}
                      helperText={
                        !!errors?.neighborhood?.message &&
                        t(
                          `companies.neighborhood.errors.${errors?.neighborhood?.message}`
                        )
                      }
                      error={!!errors?.neighborhood?.message}
                      defaultValue={select.neighborhood}
                      onChange={(e) =>
                        setValue('neighborhood', e.target.value, {
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
                      {...register('city')}
                      label={t('companies.city.label')}
                      placeholder={t('companies.city.placeholder')}
                      helperText={
                        !!errors?.city?.message &&
                        t(`companies.city.errors.${errors?.city?.message}`)
                      }
                      error={!!errors?.city?.message}
                      defaultValue={select.city}
                      onChange={(e) =>
                        setValue('city', e.target.value, {
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
                      {...register('state')}
                      label={t('companies.state.label')}
                      placeholder={t('companies.state.placeholder')}
                      helperText={
                        !!errors?.state?.message &&
                        t(`companies.state.errors.${errors?.state?.message}`)
                      }
                      error={!!errors?.state?.message}
                      defaultValue={select.state}
                      onChange={(e) =>
                        setValue('state', e.target.value, {
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
                      {...register('note')}
                      label={t('companies.note.label')}
                      placeholder={t('companies.note.placeholder')}
                      helperText={
                        !!errors?.note?.message &&
                        t(`companies.note.errors.${errors?.note?.message}`)
                      }
                      error={!!errors?.note?.message}
                      defaultValue={select.note}
                      onChange={(e) =>
                        setValue('note', e.target.value, {
                          shouldValidate: true
                        })
                      }
                      variant="outlined"
                      fullWidth
                      shrink
                      multiline
                    />
                  </div>
                </Grid>
                <Grid container item xs={12} sm={6}>
                  <div className={classes.field}>
                    <TextField
                      {...register('telephone')}
                      label={t('companies.telephone.label')}
                      placeholder={t('companies.telephone.placeholder')}
                      helperText={
                        !!errors?.telephone?.message &&
                        t(
                          `companies.telephone.errors.${errors?.telephone?.message}`
                        )
                      }
                      error={!!errors?.telephone?.message}
                      defaultValue={select.telephone}
                      onChange={(e) =>
                        setValue('telephone', e.target.value, {
                          shouldValidate: true
                        })
                      }
                      variant="outlined"
                      fullWidth
                      shrink
                    />
                  </div>
                </Grid>
              </Grid>
              {/* -------------------------------------------------------------------------------------  */}
              <FooterButtons handleCancel={toggleEdit} />
            </form>
          </Paper>
        </div>
      ) : (
        <TablePanel
          title={t('leftMenuList.companies')}
          columns={columns}
          rows={rows}
          page={page}
          rowsPerPage={rowsPerPage}
          dense={dense}
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
          open={!!success || !!error}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          variant="filled"
          elevation={6}
          severity={success ? 'success' : 'error'}
          message={t(
            `toast.companies.${success || error}.${
              success ? 'success' : 'error'
            }`
          )}
          onClose={handleCloseSnackBar}
        />
      )}
    </>
  )
}

export default Companies
