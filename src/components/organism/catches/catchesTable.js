import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableSortLabel
} from '@material-ui/core'
import { ArrowDropUp } from '@material-ui/icons'
import useStyles from './catchesTableStyle'
import { stableSort } from '../../../utils/customMethods'

const CatchesTable = (props) => {
  const { series = [] } = props
  const { catch: catchId } = useSelector((state) => state.Dashboards)

  const classes = useStyles()
  const { t } = useTranslation()

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')

  const columns = [
    {
      id: 'name',
      label: t('dashboard.table.name.label')
    },
    {
      id: 'total',
      label: t('dashboard.table.total.label')
    }
  ]

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  return (
    <div className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead className={classes.head}>
            <TableRow>
              {columns.map((element) => (
                <TableCell
                  key={element.id}
                  align={element.numeric ? 'right' : 'left'}
                  padding={element.disablePadding ? 'none' : 'normal'}
                  sortDirection={orderBy === element.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === element.id}
                    direction={orderBy === element.id ? order : 'asc'}
                    onClick={(e) => handleRequestSort(e, element.id)}
                  >
                    {element.label}
                    {orderBy === element.id ? (
                      <span className={classes.visuallyHidden}>
                        {order === 'desc'
                          ? 'sorted descending'
                          : 'sorted ascending'}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(series, order, orderBy).map((row, index) => (
              <TableRow key={index} hover>
                {columns.map((e, key) =>
                  e.id === 'total' ? (
                    <TableCell key={key} className={classes.totalColumn}>
                      <div style={{ display: 'flex' }}>
                        <div className="total">{row?.[e.id]}</div>
                        {row?.id === catchId && (
                          <ArrowDropUp className="catch" />
                        )}
                      </div>
                    </TableCell>
                  ) : (
                    <TableCell key={key}>{row?.[e.id]}</TableCell>
                  )
                )}
              </TableRow>
            ))}
            {series.length === 0 && (
              <TableRow>
                <TableCell colSpan={20}>
                  <div className={classes.notFound}>
                    {t('commons.notFound')}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default CatchesTable
