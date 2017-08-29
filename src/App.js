import React, { Component } from 'react';
import './App.css';
import Toolbar from "./Toolbar.js";
import Canvas from "./Canvas.js";
import RectangleSelector from "./RectangleSelector.js"
import TestImage from "./TestImage.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: new Image(),
      masks: [],
      selection: {
        x: 0,
        y: 0,
        w: 0,
        h: 0
      }
    };

    this.setImage = this.setImage.bind(this);
    this.onSetSelection = this.onSetSelection.bind(this);
  }

  render() {
    return (
      <div className="app">
        <Toolbar />
        <div style={{
          width: this.state.image.naturalWidth || 640,
          height: this.state.image.naturalHeight || 480,
          display: "inline-block",
          border: "1px solid black"
        }}>
          <Canvas
            image={this.state.image}
            masks={this.state.operations} />
          <RectangleSelector
            width={this.state.image.naturalWidth || 640}
            height={this.state.image.naturalHeight || 480}
            onSetSelection={this.onSetSelection} />
        </div>
        <TestImage setImage={this.setImage} />
        <span>{this.state.selection.x},{this.state.selection.y},{this.state.selection.w},{this.state.selection.h}</span>
      </div>
    );
  }

  setImage(img) {
    this.setState({ image: img });
  }

  onSetSelection(xywh) {
    this.setState({ selection: xywh });
  }
}

export default App;
