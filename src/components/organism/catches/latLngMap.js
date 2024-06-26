import React, { useCallback, useRef, useState } from 'react'
import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow
} from '@react-google-maps/api'
import { isFunction } from 'lodash'
import useStyles from './latLngMapStyle'

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

const LatLngMap = (props) => {
  const { defaultValue = {} } = props
  const classes = useStyles()
  const [selected, setSelected] = useState(null)
  const [marker, setMarkers] = useState(defaultValue)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
    libraries
  })

  const mapRef = useRef()

  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  const handleChange = (e) => {
    const coordinates = {
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng()
    }
    setMarkers(coordinates)
    if (isFunction(props.onChange)) {
      props.onChange(coordinates)
    }
  }

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
          onClick={handleChange}
        >
          {marker?.latitude && marker?.longitude && (
            <Marker
              position={{
                lat: marker?.latitude,
                lng: marker?.longitude
              }}
              icon={{
                url: '/ovitrap.png',
                scaledSize: new window.google.maps.Size(50, 58),
                anchor: new window.google.maps.Point(24, 0)
              }}
            />
          )}
        </GoogleMap>
      )}
    </div>
  )
}

export default LatLngMap
