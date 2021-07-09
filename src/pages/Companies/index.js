import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button, Paper } from '@material-ui/core'
import TablePanel from '../../components/organism/panels/tablePanel'

import { getData } from '../../store/company/actions'
import useStyles from './indexStyle'
import FooterButtons from '../../components/molecules/footer/buttons'
import Delete from '../../components/organism/dialogs/delete'

const Companies = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { companies: rows = [] } = useSelector((state) => state.Companies)
  const columns = [
    {
      id: 'name',
      label: t('companies.name')
    },
    {
      id: 'email',
      label: t('companies.email')
    },
    {
      id: 'document',
      label: t('companies.document')
    },
    {
      id: 'site',
      label: t('companies.site')
    },
    {
      id: 'cep',
      label: t('companies.cep')
    },
    {
      id: 'city',
      label: t('companies.city')
    },
    {
      id: 'state',
      label: t('companies.state')
    },
    {
      id: 'action',
      label: t('commons.action')
    }
  ]
  const [data, setData] = useState({})

  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)

  const toggleEdit = () => {
    setIsOpenEdit((prev) => !prev)
  }

  const handleEdit = () => {
    toggleEdit()
    console.log('EDIT', data)
  }

  const openEdit = (e) => {
    toggleEdit()
    setData(e)
  }

  const toggleDelete = () => {
    setIsOpenDelete((prev) => !prev)
  }
  const handleDelete = () => {
    toggleDelete()
    console.log('DELETE', data)
  }

  const openDelete = (e) => {
    toggleDelete()
    setData(e)
  }

  useEffect(() => {
    dispatch(getData('companies'))
  }, [])

  return (
    <>
      {isOpenEdit ? (
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <div className={classes.form}>{JSON.stringify(data)}</div>

            <FooterButtons
              handleCancel={toggleEdit}
              handleConfirm={handleEdit}
            />
          </Paper>
        </div>
      ) : (
        <TablePanel
          title={t('leftMenuList.companies')}
          columns={columns}
          rows={rows}
          openEdit={openEdit}
          openDelete={openDelete}
        />
      )}
      {isOpenDelete && (
        <Delete
          data={data}
          isOpen={isOpenDelete}
          handleCancel={toggleDelete}
          handleConfirm={handleDelete}
        />
      )}
    </>
  )
}

export default Companies
