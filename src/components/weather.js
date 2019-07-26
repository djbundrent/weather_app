import React, { Component } from 'react'

class Weather extends Component {
  render () {
    return (

      <div>
        { this.props.city && this.props.country && <h2>Current Conditions for: {this.props.city}, {this.props.country} </h2> }
        { this.props.temperature && <p>Temperature: {this.props.temperature} </p> }
        { this.props.humidity && <p>Humidity: {this.props.humidity} </p> }
        { this.props.description && <p>Conditions: {this.props.description}</p> }
        { this.props.sunrise && <p>Sunrise: {this.props.formatDateTime(this.props.sunrise, this.props.timezone)} </p> }
        { this.props.sunset && <p>Sunrise: {this.props.formatDateTime(this.props.sunset, this.props.timezone)} </p> }
        { this.props.icon && this.props.description && <img src={`http://openweathermap.org/img/wn/${this.props.icon}@2x.png`} alt={`${this.props.description}`} title={`${this.props.description}`} /> }
        { this.props.error && <p>ERROR: {this.props.error}</p> }
      </div>
    )
  }
}

export default Weather
