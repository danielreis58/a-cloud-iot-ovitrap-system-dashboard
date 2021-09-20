import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Grid, Paper } from '@material-ui/core'
import CatchesCharts from '../../components/organism/catches/catchesChart'
import CatchesTable from '../../components/organism/catches/catchesTable'
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
      name: e.name,
      total: e.total,
      data: e?.data?.map((e2) => [new Date(e2.date), e2.total]) ?? []
    }))
    console.log('mapData', mapData)
    setSeries(mapData)
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
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            {series.length > 0 ? (
              <CatchesCharts series={series} />
            ) : (
              <div className={classes.notFound}>{t('commons.notFound')}</div>
            )}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <CatchesTable series={series} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>Mapa</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>Clima</Paper>
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
