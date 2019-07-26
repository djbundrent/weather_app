import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Titles from './components/titles';
import Form from './components/form';
import Weather from './components/weather';
import Header from './components/header';
import Forecast from './components/forecast';
import FormForecast from './components/form_forecast';
import RenderMap from './components/render_map';

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
    timezone: undefined,
    forecast: [],
    forecastCity: undefined,
    forecastCountry: undefined,
    icon: undefined,
    group: undefined,
    error: undefined
  }

  //Poll the OpenWeather API to get the current weather observation for a particular city/country
  getWeather = async (event) => {
    // Set up variables we'll use and prevent page reload on submit
    event.preventDefault();
    const city = event.target.elements.city.value;
    const country = event.target.elements.country.value;

    // Make API call and parse the JSON response
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=${API_KEY}`);
    const data = await api_call.json();

    // Set state when there's valid data or set error state.
    if (city && country) {

      this.setState({ 
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        timezone: data.timezone,
        icon: data.weather[0].icon,
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
        timezone: undefined,
        icon: undefined,
        error: 'Please enter a valid city.'
      });
    }
  }

  // Poll the OpenWeather API rto get 5-day Forecast in 3-hour increments for a particular city/country
  getForecast = async (event) => {
    // Prevent page reload on submit
    event.preventDefault();
    
    // Get most relevant city,country pairing
    const city = event.target.elements.city.value;
    const country = event.target.elements.country.value;

    // Make API call and parse the JSON response
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=imperial&appid=${API_KEY}`);
    const data = await api_call.json();
    
    // Test: Make sure you get a response
    console.log(data);
    console.log(data.city.name + ' ' + data.city.country);
    console.log(data.list[0].main.temp);
    console.log(data.list[0].weather[0].description)

    // If the city,couontry combination is valid then set state with the appropriate data, otherwise return error message
    if (city && country) {
      this.setState ({
        forecastCity: data.city.name,
        forecastCountry: data.city.country,
        forecast: data.list
      });
    } else {
      this.setState ({

        forecastCity: undefined,
        forecastCountry: undefined,
        forecast: [],
        error: 'Please enter a valid city.'
      });
    }
  }

  // Convert Unix Date Time to GMT
  formatDateTime (unixTimestamp, timezone) {
    const date = new Date(unixTimestamp * 1000) 
    const fullTime = date.toUTCString()
    return fullTime
  }

  render(){
    return (
      <BrowserRouter>
        <div>
          <div>
            <Header />
            <Route exact path="/" component={Titles} />
            <Form getWeather={this.getWeather}/>
            <Route exact path="/current" render={ () => <Weather temperature={this.state.temperature}
              city={this.state.city}
              country={this.state.country}
              humidity={this.state.humidity}
              description={this.state.description}
              sunrise={this.state.sunrise}
              sunset={this.state.sunset}
              timezone={this.state.timezone}
              formatDateTime={this.formatDateTime}
              icon={this.state.icon}
              error={this.state.error}/>} />              
            <FormForecast getForecast={this.getForecast} />
            <Route exact path="/forecast" render={ () => <Forecast 
              foreastCity={this.state.forecastCity}
              forecastCountry={this.state.forecastCountry}
              forecast={this.state.forecast}/>} />
            {/* <Route exact path="/map" render={() => <RenderMap /> }/> */}
              
          </div>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;