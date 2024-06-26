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
import CatchesMap from '../../components/organism/catches/catchesMap'

const Dashboard = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { data, success, error } = useSelector((state) => state.Dashboards)

  const [series, setSeries] = useState([])

  const setDataSeries = (objData) => {
    const arrayData = objToArray(objData)

    const mapData = arrayData.map((e) => ({
      id: e.id,
      name: e.name,
      coordinates: e.coordinates,
      total: e.total,
      data: e?.data?.map((e2) => [new Date(e2.date), e2.total]) ?? []
    }))
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
    dispatch(setData({ success: false, error: false, catch: null }))
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper className={classes.paper}>
            {series.length > 0 ? (
              <CatchesCharts series={series} />
            ) : (
              <div className={classes.notFound}>{t('commons.notFound')}</div>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper} style={{ minHeight: '300px' }}>
            <CatchesTable series={series} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <CatchesMap series={series} />
          </Paper>
        </Grid>
        {/* <Grid item xs={12}>
          <Paper>Clima</Paper>
        </Grid> */}
      </Grid>
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
