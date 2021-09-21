import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import useStyles from './catchesMapStyle'

const CatchesMap = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const [markers, setMarkers] = useState([])

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
    libraries: ['places']
  })
  const containerStyle = {
    width: '100%',
    height: '500px'
  }

  const center = {
    lat: -22.42566,
    lng: -45.459988
  }

  return (
    <div classes={classes.map}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={14}
          center={center}
          onClick={(event) =>
            setMarkers((current) => [
              ...current,
              {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date()
              }
            ])
          }
        >
          {markers.map((marker) => (
            <Marker
              key={marker.time.toISOString()}
              position={{ lat: marker.lat, lng: marker.lng }}
            />
          ))}
        </GoogleMap>
      )}
    </div>
  )
}

export default CatchesMap
