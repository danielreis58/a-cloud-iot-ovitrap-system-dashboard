import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import TablePanel from '../../components/organism/panels/tablePanel'

import { getData } from '../../store/company/actions'

const Companies = () => {
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

  useEffect(() => {
    dispatch(getData('companies'))
  }, [])

  return (
    <TablePanel
      title={t('leftMenuList.companies')}
      columns={columns}
      rows={rows}
      handleEdit={(e) => console.log(e)}
      handleDelete={(e) => console.log(e)}
    />
  )
}

export default Companies
