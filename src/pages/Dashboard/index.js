import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Grid, Paper } from '@material-ui/core'
import { format, parseISO } from 'date-fns'
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

  const arrayData = objToArray(data)
  console.log('arrayData', arrayData)

  const series = arrayData.map((e) => ({
    name: e.ovitrap_name,
    data: e?.data?.map((e2) => [e2.created_at, e2.number]) ?? []
  }))
  console.log('series', series)

  const options = {
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      min: 0
    },
    tooltip: {
      x: {
        format: 'hh:mm:ss dd/MM/yy'
      }
    }
  }
  useEffect(() => {
    dispatch(readData())
  }, [])

  const handleCloseSnackBar = () => {
    dispatch(setData({ success: false, error: false }))
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper>
            <Charts options={options} series={series} type="line" />
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
