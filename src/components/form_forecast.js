import React, { Component } from 'react'

class FormForecast extends Component {
  render () {
    return (
      <form onSubmit={this.props.getForecast}>
        <input type='text' name='city' placeholder='City...' />
        <input type='text' name='country' placeholder='Country...' />
        <button>Get Forecast</button>
      </form>
    )
  }
}

export default FormForecast
