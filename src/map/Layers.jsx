import React, { useState } from 'react'
import { 
  useMapEvents, 
  TileLayer, 
  LayersControl,
  LayerGroup,
  GeoJSON, 
  Marker, 
  Popup 
} from 'react-leaflet'
import L from 'leaflet'
import { Typography, Divider } from '@material-ui/core'
import WY from '../data/Wyoming.json'
import MT from '../data/Montana.json'
import ND from '../data/NorthDakota.json'
import SD from '../data/SouthDakota.json'

const Layers = () => {
  const [borderData, setBorderData] = useState([ND, MT, SD, WY])

  const map = useMapEvents({
    zoomend: () => {
      console.log(map.getZoom())
    },
    moveend: () => {
      console.log(map.getBounds())
    }
  })

  const getMarkerPosition = (state_name) => {
    switch (state_name) {
      case 'Montana':
        return L.latLng(46.8797, -110.3626)
      case 'Wyoming':
        return L.latLng(43.0760, -107.2903)
      case 'North Dakota':
        return L.latLng(47.5515, -101.0020)
      case 'South Dakota':
        return L.latLng(43.9695, -99.9018)
      default: return
    }
  }

  return (
    <>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Basic Map">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Topo Map">
          <TileLayer
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        {borderData.map((data) => {
          const geojson = data.features[0].geometry
          const state_name = data.features[0].properties.display_name.split(',')[0]
          
          return (
            <>
              <LayersControl.Overlay checked name={state_name}>
                <LayerGroup>
                <GeoJSON key={state_name} data={geojson} pathOptions={{ color: 'blue' }}>
                  <Marker position={getMarkerPosition(state_name)}>
                    <Popup>
                      <Typography variant='subtitle2'>
                        {state_name}
                      </Typography>
                      <Divider />
                      <Typography variant='body2' style={{ margin: 3 }}>
                        Lat: {JSON.stringify(getMarkerPosition(state_name).lat)}
                      </Typography>
                      <Typography variant='body2' style={{ margin: 3 }}>
                        Lng: {JSON.stringify(getMarkerPosition(state_name).lng)}
                      </Typography>
                    </Popup>
                  </Marker>
                </GeoJSON>
                </LayerGroup>
              </LayersControl.Overlay>
            </>
          )
        })}
      </LayersControl>
    </>
  )
}

export default Layers