import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Paper, Grid } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { v4 as uuidv4 } from 'uuid'

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
} from '../../store/ovitraps/actions'

const Ovitraps = () => {
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
    (state) => state.Ovitraps
  )
  const rows = objToArray(data)

  const columns = [
    {
      id: 'name',
      label: t('ovitraps.name.label')
    },
    {
      id: 'user_id',
      label: t('ovitraps.user_id.label')
    },
    {
      id: 'action',
      label: t('commons.action')
    }
  ]

  const initialState = {
    id: null,
    name: '',
    user_id: null
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
                <Grid container item xs={12}>
                  <div className={classes.field}>
                    <TextField
                      {...register('id')}
                      label={t('ovitraps.id.label')}
                      error={!!errors?.id?.message}
                      defaultValue={select.id || uuidv4()}
                      disabled
                      variant="outlined"
                      fullWidth
                      shrink
                    />
                  </div>
                </Grid>
                <Grid container item xs={12} sm={6}>
                  <div className={classes.field}>
                    <TextField
                      {...register('name')}
                      label={t('ovitraps.name.label')}
                      placeholder={t('ovitraps.name.placeholder')}
                      helperText={
                        !!errors?.name?.message &&
                        t(`ovitraps.name.errors.${errors?.name?.message}`)
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
                      {...register('user_id')}
                      label={t('ovitraps.user_id.label')}
                      placeholder={t('ovitraps.user_id.placeholder')}
                      helperText={
                        !!errors?.user_id?.message &&
                        t(`ovitraps.user_id.errors.${errors?.user_id?.message}`)
                      }
                      error={!!errors?.user_id?.message}
                      defaultValue={select.user_id}
                      onChange={(e) =>
                        setValue('user_id', e.target.value, {
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
          title={t('leftMenuList.ovitraps')}
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
          open={success || error}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          variant="filled"
          elevation={6}
          severity={success ? 'success' : 'error'}
          message={t(
            `toast.ovitraps.${success || error}.${
              success ? 'success' : 'error'
            }`
          )}
          onClose={handleCloseSnackBar}
        />
      )}
    </>
  )
}

export default Ovitraps
