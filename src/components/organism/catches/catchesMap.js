import React, { useCallback, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { SvgIcon } from '@material-ui/core'
import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow
} from '@react-google-maps/api'
import useStyles from './catchesMapStyle'
import MosquitoIcon from '../../../assets/icons/mosquitoIcon'

const libraries = ['places']
const mapContainerStyle = {
  width: '100%',
  height: '500px'
}
const options = {
  styles: {},
  disableDefaultUI: true,
  zoomControl: true
}
const center = {
  lat: -22.42566,
  lng: -45.459988
}

const CatchesMap = (props) => {
  const { series = [] } = props
  const classes = useStyles()

  const [selected, setSelected] = useState(null)
  const { catch: catchId } = useSelector((state) => state.Dashboards)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
    libraries
  })

  const mapRef = useRef()
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  return (
    <div classes={classes.map}>
      {isLoaded && (
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          options={options}
          center={center}
          onLoad={onMapLoad}
        >
          {series.map((marker, key) => (
            <div key={key}>
              <Marker
                key={marker.id}
                position={{
                  lat: marker?.coordinates?.lat,
                  lng: marker?.coordinates?.lng
                }}
                icon={{
                  url: '/ovitrap.png',
                  scaledSize: new window.google.maps.Size(50, 58),
                  anchor: new window.google.maps.Point(24, 0)
                }}
                onClick={() => {
                  setSelected(marker)
                }}
              />
              {catchId === marker.id && (
                <InfoWindow
                  className={classes.catchTooltip}
                  position={{
                    lat: marker?.coordinates?.lat,
                    lng: marker?.coordinates?.lng
                  }}
                >
                  <SvgIcon>
                    <MosquitoIcon fill="#303030" />
                  </SvgIcon>
                </InfoWindow>
              )}
            </div>
          ))}
          {selected && (
            <InfoWindow
              position={{
                lat: selected.coordinates.lat,
                lng: selected.coordinates.lng
              }}
              onCloseClick={() => setSelected(null)}
            >
              <div className={classes.makerTooltip}>
                <h3>{selected.name}</h3>
                <p>{`Total: ${selected.total}`}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  )
}

export default CatchesMap
