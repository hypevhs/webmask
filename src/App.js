import React, { Component } from 'react';
import './App.css';
import Toolbar from './Toolbar.js';
import TestImage from './TestImage.js';
import CanvasSet from './CanvasSet.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
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
    this.addMask = this.addMask.bind(this);
  }

  render() {
    return (
      <div className="app">
        <Toolbar addMask={this.addMask} />
        <CanvasSet
          image={this.state.image}
          masks={this.state.image ? this.state.masks : []}
          onSetSelection={this.onSetSelection}
        />
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

  addMask(type) {
    // append mask object to this.state.mask (an array)
    this.setState((p) => {
      var copy = p.masks.slice(0);
      copy.push({
        x: p.selection.x,
        y: p.selection.y,
        w: p.selection.w,
        h: p.selection.h,
        type: type
      });
      return {
        masks: copy
      }
    });
  }
}

export default App;
