import React, {Component} from 'react';

import Titles from './components/titles';
import Form from './components/form';
import Weather from './components/weather';

const API_KEY = "d73cd78ea5ced8d289bf46b308195fe8";
class App extends Component {

  getWeather = async (event) => {
    event.preventDefault();

    const city = event.target.elements.city.value;
    const country = event.target.elements.country.value;

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);

    const data = await api_call.json();

    console.log(data);
  }

  render(){
    return (
      <div>
        <div>
          <Titles />
          <Form getWeather={this.getWeather}/>
          <Weather />
        </div>
      </div>

    );
  }
}

export default App;