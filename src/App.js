import React, {Component} from 'react';

import Titles from './components/titles';
import Form from './components/form';
import Weather from './components/weather';

const API_KEY = "d73cd78ea5ced8d289bf46b308195fe8";
class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined
  }

  getWeather = async (event) => {
    event.preventDefault();

    const city = event.target.elements.city.value;
    const country = event.target.elements.country.value;

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=${API_KEY}`);

    const data = await api_call.json();

    if (city && country) {

      this.setState({ 
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset
      });

      console.log(data);
    } else {
      this.setState({ 
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: 'Please enter valid values.'
      });
    }
  }

  formatDateTime (unixTimestamp) {
    const date = new Date(unixTimestamp * 1000)
    const hours = date.getHours()
    const minutes = '0' + date.getMinutes()
    return hours + ':' + minutes.substr(-2)
  }

  render(){
    return (
      <div>
        <div>
          <Titles />
          <Form getWeather={this.getWeather}/>
          <Weather 
            temperature={this.state.temperature}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            description={this.state.description}
            sunrise={this.state.sunrise}
            sunset={this.state.sunset}
            formatDateTime={this.formatDateTime.bind(this)}
            error={this.state.error}
            />
        </div>
      </div>

    );
  }
}

export default App;