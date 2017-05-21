import React from 'react';
import {render} from 'react-dom';
import Appl from './App'

class App extends React.Component {
  
  render() {
    return (
      <div>
        <Appl />
      </div>
    )
  }
}

render(<App />, document.getElementById('app'));
