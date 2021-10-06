import React, { useEffect, useRef, useState } from 'react'
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
import LatLngMap from '../../components/organism/catches/latLngMap'

const Ovitraps = () => {
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

  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)

  const toggleEdit = () => setIsOpenEdit((prev) => !prev)
  const toggleDelete = () => setIsOpenDelete((prev) => !prev)

  /* ------------------------------------- VARIABLES -------------------------------------  */

  const { data, form, page, rowsPerPage, dense, success, error } = useSelector(
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

  const defaultId = useRef(uuidv4())

  const initialState = {
    id: defaultId.current,
    name: '',
    latitude: null,
    longitude: null,
    user_id: null,
    company_id: null
  }

  /* -------------------------------------------------------------------------------------  */

  const userLabel = useRef({})
  const companyLabel = useRef({})

  const [select, setSelected] = useState(initialState)

  const handleEditCreate = (e) => {
    toggleEdit()
    if (e?.id !== defaultId.current) {
      dispatch(updateData(e))
    } else {
      dispatch(createData(e))
      defaultId.current = uuidv4()
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
                      defaultValue={select.id}
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
                    <FormControl
                      fullWidth
                      shrink
                      variant="outlined"
                      error={!!errors?.user_id?.message}
                    >
                      <InputLabel ref={userLabel}>
                        {t('ovitraps.user_id.label')}
                      </InputLabel>
                      <Select
                        {...register('user_id')}
                        defaultValue={select?.user_id ?? 'empty'}
                        onChange={(e) =>
                          setValue('user_id', e.target.value, {
                            shouldValidate: true
                          })
                        }
                        input={
                          <OutlinedInput
                            notched
                            labelWidth={userLabel?.current?.offsetWidth ?? 0}
                          />
                        }
                      >
                        <MenuItem disabled value="empty">
                          <div style={{ color: theme.palette.placeholder }}>
                            {t('ovitraps.user_id.placeholder')}
                          </div>
                        </MenuItem>
                        {form?.users?.map((e) => (
                          <MenuItem key={e.id} value={e.id}>
                            {e.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {!!errors?.user_id?.message &&
                          t(
                            `ovitraps.user_id.errors.${errors?.user_id?.message}`
                          )}
                      </FormHelperText>
                    </FormControl>
                  </div>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={6}>
                <div className={classes.field}>
                  <FormControl
                    fullWidth
                    shrink
                    variant="outlined"
                    error={!!errors?.company_id?.message}
                  >
                    <InputLabel ref={companyLabel}>
                      {t('ovitraps.company_id.label')}
                    </InputLabel>
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
                          labelWidth={companyLabel?.current?.offsetWidth ?? 0}
                        />
                      }
                    >
                      <MenuItem disabled value="empty">
                        <div style={{ color: theme.palette.placeholder }}>
                          {t('ovitraps.company_id.placeholder')}
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
                          `ovitraps.company_id.errors.${errors?.company_id?.message}`
                        )}
                    </FormHelperText>
                  </FormControl>
                </div>
              </Grid>
              <Grid container item xs={12}>
                <FormControl
                  fullWidth
                  shrink
                  variant="outlined"
                  error={!!errors?.location?.lat?.message}
                >
                  <InputLabel>{t('ovitraps.location.label')}</InputLabel>
                  <Paper style={{ width: '100%' }}>
                    <LatLngMap
                      {...register('location')}
                      defaultValue={{
                        lat: select?.latitude,
                        lng: select?.longitude
                      }}
                      onChange={(e) =>
                        setValue('location', e, {
                          shouldValidate: true
                        })
                      }
                    />
                    <FormHelperText>
                      {!!errors?.location?.lat?.message &&
                        t(
                          `ovitraps.location.errors.${errors?.location?.lat?.message}`
                        )}
                    </FormHelperText>
                  </Paper>
                </FormControl>
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
