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
  const orderData = objToArray(data).sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )
  const series = [
    {
      name: 'Cases',
      data: [
        555,
        12038,
        69030,
        88369,
        167466,
        932638,
        2055423,
        3343777,
        3845718
      ]
    },
    {
      name: 'Recovered',
      data: [28, 284, 9394, 42710, 76026, 191853, 501538, 1029651, 1255481]
    },
    {
      name: 'Deaths',
      data: [17, 259, 1666, 2996, 6472, 49675, 140658, 238619, 269567]
    }
  ]
  const options = {
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'category',
      categories: orderData.map((e) =>
        format(parseISO(e.createdAt), 'dd/MM/yy')
      )
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy'
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
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240
            }}
          >
            <Charts
              options={options}
              series={series}
              type="line"
              height={240}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240
            }}
          >
            BBBB
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            CCCCC
          </Paper>
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
