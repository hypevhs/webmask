import React, { Component } from 'react';
import './App.css';
import Toolbar from "./Toolbar.js";
import Canvas from "./Canvas.js";
import TestImage from "./TestImage.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.setImage = this.setImage.bind(this);

    this.state = {
      image: new Image(),
      masks: []
    };
  }

  render() {
    return (
      <div className="app">
        <Toolbar />
        <Canvas
          image={this.state.image}
          masks={this.state.operations} />
        <TestImage setImage={this.setImage} />
      </div>
    );
  }

  setImage(img) {
    this.setState({ image: img });
  }
}

export default App;
