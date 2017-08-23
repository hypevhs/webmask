import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Toolbar from "./Toolbar.js";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Toolbar />
        <canvas>Canvas not supported.</canvas>
      </div>
    );
  }
}

export default App;
