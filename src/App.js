import React, {Component} from 'react';

import Titles from './components/titles';
import Titles from './components/form';

class App extends Component {
  render(){
    return (
      <div>
        <div>
          <Titles />
          <Form />
          <Weather />
        </div>
      </div>

    );
  }
}

export default App;