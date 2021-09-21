import React, { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow
} from '@react-google-maps/api'
import useStyles from './catchesMapStyle'

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
  const { t } = useTranslation()
  const [zoom, setZoom] = useState(14)
  const [selected, setSelected] = useState(null)

  const { isLoaded, loadError } = useLoadScript({
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
          zoom={zoom}
          options={options}
          center={center}
          onLoad={onMapLoad}
        >
          {series.map((marker) => (
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
