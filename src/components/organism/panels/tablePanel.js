import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch,
  Button
} from '@material-ui/core'

import {
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
  Edit as EditIcon
} from '@material-ui/icons'

import { useStyles, useToolbarStyles } from './tablePanelStyle'
import { isFunction } from '../../../utils/customMethods'

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const getComparator = (order, orderBy) =>
  order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const EnhancedTableHead = (props) => {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    columns
  } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {columns.map((element) => (
          <TableCell
            key={element.id}
            align={element.numeric ? 'right' : 'left'}
            padding={element.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === element.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === element.id}
              direction={orderBy === element.id ? order : 'asc'}
              onClick={createSortHandler(element.id)}
            >
              {element.label}
              {orderBy === element.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles()
  const { t } = useTranslation()

  const { numSelected, selected, title = '' } = props

  return (
    <Toolbar
      className={`${classes.root} ${numSelected > 0 ? classes.highlight : ''}`}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {`${numSelected} ${t('commons.selected')}`}
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title={t('commons.delete')}>
          <IconButton
            aria-label="delete"
            onClick={() =>
              isFunction(props.handleDelete) && props.handleDelete(selected)
            }
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <div className={classes.toobarLeftButtons}>
          <Tooltip title={t('commons.filter')}>
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('commons.add')}>
            <Button
              className={classes.addButton}
              type="submit"
              variant="contained"
              color="primary"
              onClick={() =>
                isFunction(props.handleEdit) && props.handleEdit(null)
              }
            >
              {t('commons.add')}
            </Button>
          </Tooltip>
        </div>
      )}
    </Toolbar>
  )
}

const TablePanel = (props) => {
  const dispatch = useDispatch()
  const {
    title = '',
    rows = [],
    columns = [],
    page,
    rowsPerPage,
    dense,
    setData
  } = props
  const classes = useStyles()
  const { t } = useTranslation()
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('calories')
  const [selected, setSelected] = useState([])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(rows)
      return
    }
    setSelected([])
  }

  const handleClick = (event, row) => {
    const { id } = row
    const selectedIndex = selected.findIndex((e) => e.id === id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    dispatch(setData({ page: newPage }))
  }

  const handleChangeRowsPerPage = (event) => {
    dispatch(
      setData({ page: 0, rowsPerPage: parseInt(event.target.value, 10) })
    )
  }

  const handleChangeDense = (event) => {
    dispatch(setData({ dense: event.target.checked }))
  }

  const isSelected = (id) => selected.findIndex((e) => e.id === id) !== -1

  useEffect(() => {
    setSelected(props.selected)
  }, [props.selected])

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          selected={selected}
          numSelected={selected.length}
          title={title}
          handleDelete={props.openDelete}
          handleEdit={props.openEdit}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              columns={columns}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      aria-checked={isItemSelected}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onClick={(event) => handleClick(event, row)}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      {columns.map(
                        (e) =>
                          e.id !== 'action' && (
                            <TableCell>{row?.[e.id]} </TableCell>
                          )
                      )}
                      <TableCell style={{ width: 0 }}>
                        <Tooltip title={t('commons.edit')}>
                          <IconButton
                            aria-label="edit"
                            size={dense ? 'small' : 'medium'}
                            onClick={() =>
                              isFunction(props.openEdit) && props.openEdit(row)
                            }
                          >
                            <EditIcon
                              style={{
                                fontSize: dense ? '16px' : '18px'
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )
                })}
              {rows.length === 0 && (
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
        <TablePagination
          labelRowsPerPage={t('commons.rowsPerPage')}
          rowsPerPageOptions={[1, 5, 10, 25, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label={t('commons.densePadding')}
      />
    </div>
  )
}

export default TablePanel
