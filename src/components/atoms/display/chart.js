import React from 'react'
import ReactApexCharts from 'react-apexcharts'

const Charts = (props) => (
  <ReactApexCharts
    options={props.options}
    series={props.series}
    type={props.type}
    width={props.width}
    height={props.height}
  />
)

export default Charts
