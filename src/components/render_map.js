import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

class RenderMap extends Component {
  constructor () {
    super()
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13
    }
  }

  render () {
    const position = [this.state.lat, this.state.lng]
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    )
  }
}

export default RenderMap

// ReactDOM.render(<RenderMap />, document.getElementById('container'))
