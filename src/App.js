import React, { Component } from 'react';
import './App.css';
import Routes from './components/Routes.js'


class App extends Component {
  render() {
    return (
      <div className="App">
        {Routes}
      </div>
    );
  }
}

export default App;

