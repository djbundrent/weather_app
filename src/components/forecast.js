import React, { Component } from 'react'

class Forecast extends Component {
   // Gets the forecast from the returned data and returns it as an object
   groupByDays = (forecast) => {
    return (forecast.reduce((list, item) => {
      const forecastDate = item.dt_txt.substr(0,10);
      list[forecastDate] = list[forecastDate] || [];
      list[forecastDate].push(item);

      return list;
    }, {}));
  };

  render () {
    let forecast = this.props.forecast
    let dailyForecast = this.groupByDays(forecast)

    return (
      <div>
        <h1>5-day Forecast</h1>
        
        { this.props.forecastCity && this.props.forecastCountry && <p>Location: {this.props.forecastCity}, {this.props.forecastCountry} </p> }
        { this.props.error && <p>ERROR: {this.props.error}</p> }
      </div>
    )
  }
}

export default Forecast
