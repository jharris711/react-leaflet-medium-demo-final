import React from 'react'
import { MapContainer, ZoomControl } from 'react-leaflet'
import Layers from './Layers'

const Map = () => {

  return (
    <>
      <MapContainer 
        center={[37.0902, -95.7129]} 
        zoom={3} 
        zoomControl={false} 
        style={{ height: '100vh', width: '100%' }}
      >
        <Layers />
        <ZoomControl position='topright'/>
      </MapContainer>
    </>
  )
}

export default Map