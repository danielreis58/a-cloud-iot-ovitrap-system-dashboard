import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Paper, Grid } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import useStyles from './indexStyle'

import { getData } from '../../store/company/actions'

import TextField from '../../components/atoms/inputs/textfield'
import FooterButtons from '../../components/molecules/footer/buttons'
import Delete from '../../components/organism/dialogs/delete'
import TablePanel from '../../components/organism/panels/tablePanel'

import schema from './schema'

const Companies = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  const { companies: rows = [] } = useSelector((state) => state.Companies)
  const columns = [
    {
      id: 'name',
      label: t('companies.name')
    },
    {
      id: 'email',
      label: t('companies.email')
    },
    {
      id: 'document',
      label: t('companies.document')
    },
    {
      id: 'site',
      label: t('companies.site')
    },
    {
      id: 'cep',
      label: t('companies.cep')
    },
    {
      id: 'city',
      label: t('companies.city')
    },
    {
      id: 'state',
      label: t('companies.state')
    },
    {
      id: 'action',
      label: t('commons.action')
    }
  ]
  const [data, setData] = useState({})

  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)

  const toggleEdit = () => {
    reset()
    setIsOpenEdit((prev) => !prev)
  }

  const handleEdit = (e) => {
    console.log(e)
    toggleEdit()
    console.log('EDIT', data)
  }

  const openEdit = (e) => {
    toggleEdit()
    setData(e)
  }

  const toggleDelete = () => {
    setIsOpenDelete((prev) => !prev)
  }
  const handleDelete = () => {
    toggleDelete()
    console.log('DELETE', data)
  }

  const openDelete = (e) => {
    toggleDelete()
    setData(e)
  }

  useEffect(() => {
    dispatch(getData('companies'))
  }, [])

  return (
    <>
      {isOpenEdit ? (
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <form onSubmit={handleSubmit(handleEdit)}>
              <Grid container spacing={2}>
                <Grid container item xs={12} sm={6}>
                  <div className={classes.field}>
                    <TextField
                      {...register('name')}
                      label={t('fields.name.label')}
                      placeholder={t('fields.name.placeholder')}
                      helperText={
                        !!errors?.name?.message &&
                        t(`fields.name.errors.${errors?.name?.message}`)
                      }
                      error={!!errors?.name?.message}
                      defaultValue={data.name}
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
                      label={t('fields.email.label')}
                      placeholder={t('fields.email.placeholder')}
                      helperText={
                        !!errors?.email?.message &&
                        t(`fields.email.errors.${errors?.email?.message}`)
                      }
                      error={!!errors?.email?.message}
                      defaultValue={data.email}
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
                      label={t('fields.document.label')}
                      placeholder={t('fields.document.placeholder')}
                      helperText={
                        !!errors?.document?.message &&
                        t(`fields.document.errors.${errors?.document?.message}`)
                      }
                      error={!!errors?.document?.message}
                      defaultValue={data.document}
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
                      label={t('fields.site.label')}
                      placeholder={t('fields.site.placeholder')}
                      helperText={
                        !!errors?.site?.message &&
                        t(`fields.site.errors.${errors?.site?.message}`)
                      }
                      error={!!errors?.site?.message}
                      defaultValue={data.site}
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
                      label={t('fields.cep.label')}
                      placeholder={t('fields.cep.placeholder')}
                      helperText={
                        !!errors?.cep?.message &&
                        t(`fields.cep.errors.${errors?.cep?.message}`)
                      }
                      error={!!errors?.cep?.message}
                      defaultValue={data.cep}
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
                      label={t('fields.address.label')}
                      placeholder={t('fields.address.placeholder')}
                      helperText={
                        !!errors?.address?.message &&
                        t(`fields.address.errors.${errors?.address?.message}`)
                      }
                      error={!!errors?.address?.message}
                      defaultValue={data.address}
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
                      label={t('fields.number.label')}
                      placeholder={t('fields.number.placeholder')}
                      helperText={
                        !!errors?.number?.message &&
                        t(`fields.number.errors.${errors?.number?.message}`)
                      }
                      error={!!errors?.number?.message}
                      defaultValue={data.number}
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
                      label={t('fields.neighborhood.label')}
                      placeholder={t('fields.neighborhood.placeholder')}
                      helperText={
                        !!errors?.neighborhood?.message &&
                        t(
                          `fields.neighborhood.errors.${errors?.neighborhood?.message}`
                        )
                      }
                      error={!!errors?.neighborhood?.message}
                      defaultValue={data.neighborhood}
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
                      label={t('fields.city.label')}
                      placeholder={t('fields.city.placeholder')}
                      helperText={
                        !!errors?.city?.message &&
                        t(`fields.city.errors.${errors?.city?.message}`)
                      }
                      error={!!errors?.city?.message}
                      defaultValue={data.city}
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
                      label={t('fields.state.label')}
                      placeholder={t('fields.state.placeholder')}
                      helperText={
                        !!errors?.state?.message &&
                        t(`fields.state.errors.${errors?.state?.message}`)
                      }
                      error={!!errors?.state?.message}
                      defaultValue={data.state}
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
                      label={t('fields.note.label')}
                      placeholder={t('fields.note.placeholder')}
                      helperText={
                        !!errors?.note?.message &&
                        t(`fields.note.errors.${errors?.note?.message}`)
                      }
                      error={!!errors?.note?.message}
                      defaultValue={data.note}
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
                      label={t('fields.telephone.label')}
                      placeholder={t('fields.telephone.placeholder')}
                      helperText={
                        !!errors?.telephone?.message &&
                        t(
                          `fields.telephone.errors.${errors?.telephone?.message}`
                        )
                      }
                      error={!!errors?.telephone?.message}
                      defaultValue={data.telephone}
                      variant="outlined"
                      fullWidth
                      shrink
                    />
                  </div>
                </Grid>
              </Grid>
              <FooterButtons handleCancel={toggleEdit} />
            </form>
          </Paper>
        </div>
      ) : (
        <TablePanel
          title={t('leftMenuList.companies')}
          columns={columns}
          rows={rows}
          openEdit={openEdit}
          openDelete={openDelete}
        />
      )}
      {isOpenDelete && (
        <Delete
          data={data}
          isOpen={isOpenDelete}
          handleCancel={toggleDelete}
          handleConfirm={handleDelete}
        />
      )}
    </>
  )
}

export default Companies
