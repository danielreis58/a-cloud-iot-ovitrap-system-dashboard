import React, { useRef, useState, useEffect, memo } from 'react'
import { useTheme } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'

import {
  PlayArrowRounded as PlayIcon,
  PauseRounded as PauseIcon,
} from '@material-ui/icons'

import { setActiveAudio } from '../../../redux/activeAudio/actions'
import IconButton from '../inputs/iconButton'
import Slider from '../feedback/slider'
import Typography from '../display/typography'

const AudioPlayer = (props) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const audioRef = useRef()

  const activeAudio = useSelector((state) => state.activeAudio)
  const activeConversation = useSelector((state) => state.activeConversation)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState()
  const [currentTimeFormated, setCurrentTimeFormated] = useState('00:00')
  const [duration, setDuration] = useState()
  const [durationFormated, setDurationFormated] = useState('00:00')

  useEffect(() => {
    if (
      activeAudio?.activeConversation === activeConversation &&
      activeAudio?.src === props?.src &&
      activeAudio?.play
    ) {
      document
        .getElementById(props.src)
        .scrollIntoView({ block: 'center', behavior: 'smooth' })
      audioRef.current.currentTime = activeAudio.track
      audioRef?.current?.play()
      setCurrentTime(activeAudio.track)
      setPlaying(true)
    }
  }, [])

  const playAudio = () => {
    audioRef?.current?.play()
    dispatch(
      setActiveAudio({
        ...activeAudio,
        activeConversation: props.activeConversation,
        src: props.src,
        type: props.type,
        play: true,
      })
    )
    setPlaying(true)
  }
  const pauseAudio = () => {
    audioRef?.current?.pause()
    dispatch(
      setActiveAudio({
        ...activeAudio,
        play: false,
      })
    )
    setPlaying(false)
  }
  const updateTrack = (value) => {
    audioRef.current.currentTime = value
  }
  const onLoadAudio = () => {
    var duration = audioRef?.current?.duration
    if (duration != Infinity) {
      var s = parseInt(duration % 60)
      var m = parseInt((duration / 60) % 60)
      if (m < 10) m = '0' + m
      if (s < 10) s = '0' + s
      setDuration(duration)
      setDurationFormated(m + ':' + s)
    }
  }
  const onTimeUpdate = () => {
    var currentTime = audioRef?.current?.currentTime
    if (currentTime != Infinity) {
      var s = parseInt(currentTime % 60)
      var m = parseInt((currentTime / 60) % 60)
      if (m < 10) m = '0' + m
      if (s < 10) s = '0' + s
      dispatch(
        setActiveAudio({
          ...activeAudio,
          track: currentTime,
        })
      )
      setCurrentTime(currentTime)
      setCurrentTimeFormated(m + ':' + s)
    }
  }
  const onEndedAudio = () => {
    var currentTime = audioRef?.current?.currentTime
    if (currentTime != Infinity) {
      var s = parseInt(currentTime % 60)
      var m = parseInt((currentTime / 60) % 60)
      if (m < 10) m = '0' + m
      if (s < 10) s = '0' + s
      dispatch(
        setActiveAudio({
          ...activeAudio,
          track: currentTime,
          play: false,
        })
      )
      setPlaying(false)
      setDuration(currentTime)
      setDurationFormated(m + ':' + s)
    }
  }

  return (
    <>
      <div id={props.src}></div>
      <audio
        ref={audioRef}
        id="audio-player"
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadAudio}
        onEnded={onEndedAudio}
        preload="auto"
      >
        <source src={props.src} type={props.type} />
      </audio>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="body1">{currentTimeFormated}</Typography>
        <div style={{ width: 20 }} />
        <Slider
          min={0}
          value={currentTime}
          max={duration}
          onChange={(e, newValue) => {
            e.stopPropagation()
            updateTrack(newValue)
          }}
        />
        <div style={{ width: 30 }} />
        <Typography variant="body1">{durationFormated}</Typography>
        <div style={{ width: 30 }} />
        <IconButton
          color="primary"
          style={{ backgroundColor: theme.palette.primary.main }}
          onClick={() => {
            playing ? pauseAudio() : playAudio()
          }}
        >
          {playing ? (
            <PauseIcon style={{ color: '#fff' }} />
          ) : (
            <PlayIcon style={{ color: '#fff' }} />
          )}
        </IconButton>
      </div>
    </>
  )
}

export default memo(AudioPlayer)
