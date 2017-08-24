import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Toolbar from "./Toolbar.js";
import Canvas from "./Canvas.js"

class App extends Component {
  render() {
    return (
      <div className="app">
        <Toolbar />
        <Canvas />
      </div>
    );
  }
}

export default App;
