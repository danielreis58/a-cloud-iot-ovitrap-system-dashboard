import React, { useEffect, useState } from 'react'
import ReactApexCharts from 'react-apexcharts'
import { useSelector } from 'react-redux'
import pt from '../../../locales/pt/apex.json'
import en from '../../../locales/eng/apex.json'
import useStyles from './catchesChartStyle'

const Charts = (props) => {
  const { series = [] } = props
  const classes = useStyles()
  const { theme } = useSelector((state) => state.Themes)
  const { locale } = useSelector((state) => state.Locales)

  const [options, setOptions] = useState({
    chart: { id: 'catches-chart', locales: [en, pt], defaultLocale: 'pt-BR' },
    theme: {
      mode: 'light',
      palette: 'palette1',
      monochrome: {
        enabled: false,
        color: '#255aee',
        shadeTo: 'light',
        shadeIntensity: 0.65
      }
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {},
    tooltip: {
      x: {
        format: 'dd/MM/yy'
      }
    }
  })

  useEffect(() => {
    setOptions((prev) => ({
      ...prev,
      chart: { ...prev.chart, defaultLocale: locale }
    }))
  }, [locale])

  useEffect(() => {
    setOptions((prev) => ({
      ...prev,
      theme: { ...prev.theme, mode: theme }
    }))
  }, [theme])

  return (
    <ReactApexCharts
      className={classes.chart}
      id="catches"
      options={options}
      series={series}
      type="line"
      height={400}
    />
  )
}

export default Charts
