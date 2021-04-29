import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import api from '../../../services/api'

import { CircularProgress } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

import { BookmarkRounded as BookmarkIcon } from '@material-ui/icons'

import Typography from './typography'

import {
  userConfigError,
  addFavoriteTransfer,
  addedFavoriteTransfer,
  deleteFavoriteTransfer,
  deletedFavoriteTransfer,
  resetUserConfig,
} from '../../../redux/userConfiguration/actions'

import useStyles from './itemListTransferStyle'

const ItemListTransfer = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const theme = useTheme()
  const [loading, setLoading] = useState(false)

  const addFavorite = async () => {
    const configId = props?.configId
    const itemId = props?.itemId

    dispatch(addFavoriteTransfer(itemId))
    try {
      const response = await api.post(`/userconfs`, {
        [`${props?.type}_id`]: itemId,
      })

      if (response.status === 200) {
        dispatch(addedFavoriteTransfer(configId, props?.type, itemId))
      } else {
        throw response.data
      }
    } catch (error) {
      let message =
        error?.response?.status === 500
          ? 'Unavailable service'
          : error?.response?.data?.message
      dispatch(
        userConfigError({ action: 'add_favorite_transfer', message: message })
      )
    }
    dispatch(resetUserConfig('add_favorite_transfer'))
  }

  const deleteFavorite = async () => {
    const configId = props?.configId
    const itemId = props?.itemId

    dispatch(deleteFavoriteTransfer(configId, itemId))
    try {
      const response = await api.delete(
        `/userconfs${configId ? '?id=' + configId : ''}`,
        {
          data: { content_id: itemId },
        }
      )

      if (response.status === 200) {
        dispatch(deletedFavoriteTransfer(configId, props?.type, itemId))
      } else {
        throw response.data
      }
    } catch (error) {
      let message =
        error?.response?.status === 500
          ? 'Unavailable service'
          : error?.response?.data?.message
      dispatch(
        userConfigError({
          action: 'delete_favorite_transfer',
          message: message,
        })
      )
    }
    dispatch(resetUserConfig('delete_favorite_transfer'))
  }

  const handleBookmark = async () => {
    if (!loading) {
      const action = !props?.bookmarked ? addFavorite : deleteFavorite

      setLoading(true)
      await action()
      setLoading(false)
    }
  }

  return (
    <>
      <div
        className={`${classes.root} ${props?.active ? classes.active : ''}`}
        onClick={props.onClick}
      >
        <Typography variant="body1">{props.text}</Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="body1"
            style={{
              color: props.online
                ? theme.palette.primary.main
                : theme.palette.details,
            }}
          >
            {props?.type === 'skill' ? `( ${props.quantity} online )` : ''}
          </Typography>
          {loading ? (
            <CircularProgress
              size={20}
              color="primary"
              style={{ marginLeft: 5 }}
            />
          ) : (
            <BookmarkIcon
              className={`${classes.bookmark} ${
                props?.bookmarked ? classes.bookmarked : ''
              }`}
              onClick={(e) => {
                e.stopPropagation()
                handleBookmark()
              }}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default ItemListTransfer
