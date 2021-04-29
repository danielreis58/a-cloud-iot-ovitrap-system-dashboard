import React, { useState } from 'react'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import { withTranslation } from 'react-i18next'
import mainListItems from '../../../pages/Dashboard/listItems'

const index = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleDrawerClose = () => {
    setIsOpen((prev) => !prev)
  }
  return (
    <Drawer variant="permanent" open={isOpen}>
      <div>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{mainListItems}</List>
      <Divider />
    </Drawer>
  )
}

export default withTranslation()(index)
