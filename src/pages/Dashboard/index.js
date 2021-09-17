import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Grid, Paper } from '@material-ui/core'
import Charts from '../../components/atoms/display/chart'
import useStyles from './indexStyle'

import Snackbar from '../../components/atoms/feedback/snackbar'

import { readData, setData } from '../../store/dashboard/actions'
import { objToArray } from '../../utils/customMethods'

const Dashboard = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { data, success, error } = useSelector((state) => state.Dashboards)

  const [series, setSeries] = useState([])

  const setDataSeries = (objData) => {
    const arrayData = objToArray(objData)
    // console.log('arrayData', arrayData)

    const mapData = arrayData.map((e) => ({
      name: e.ovitrap_name,
      data: e?.data?.map((e2) => [e2.created_at, e2.number]) ?? []
    }))
    setSeries(mapData)
    // console.log('series', series)]
  }

  useEffect(() => {
    if (data) {
      setDataSeries(data)
    }
  }, [data])

  useEffect(() => {
    dispatch(readData())
  }, [])

  const handleCloseSnackBar = () => {
    dispatch(setData({ success: false, error: false }))
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            {series.length > 0 && <Charts series={series} type="line" />}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>BBBB</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>CCCCC</Paper>
        </Grid>
      </Grid>
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
            `toast.dashboard.${success || error}.${
              success ? 'success' : 'error'
            }`
          )}
          onClose={handleCloseSnackBar}
        />
      )}
    </div>
  )
}

export default Dashboard
