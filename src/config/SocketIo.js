import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { io } from 'socket.io-client'
import { setData } from '../store/dashboard/actions'

const ENDPOINT = process.env.REACT_APP_SOCKET_URL

const SocketIo = () => {
  const { data } = useSelector((state) => state.Login)
  const [socket, setSocket] = useState(null)

  const dispatch = useDispatch()

  const handleCatch = (e) => {
    dispatch(setData({ data: e, loading: false, success: 'catch' }, 'catch'))
  }

  const initSocket = async () => {
    try {
      const localAuthUser = localStorage.authUser
      const authUser = JSON.parse(localAuthUser)
      const { Authorization } = authUser
      const socketIo = io(ENDPOINT, {
        withCredentials: true,
        extraHeaders: {
          Authorization
        }
      })
      setSocket(socketIo)
      console.log('SOCKET CONNECT SUCCESSFULLY')
    } catch (error) {
      console.log('SOCKET ERROR', error)
    }
  }

  useEffect(() => {
    if (socket) {
      socket.on('catch', handleCatch)
    }
  }, [socket])

  useEffect(() => {
    if (data?.Authorization) {
      initSocket()
    }
  }, [data])

  return <></>
}

export default SocketIo
