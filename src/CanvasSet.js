import React, { Component } from 'react';
import Canvas from './Canvas.js';
import RectangleSelector from './RectangleSelector.js';
import './CanvasSet.css';

class CanvasSet extends Component {
  render() {
    const style = {
      width: this.getWidth(),
      height: this.getHeight()
    };

    return (
      <div style={style} className="canvas-set">
        <Canvas
            image={this.props.image}
            width={this.getWidth()}
            height={this.getHeight()}
            masks={this.props.masks} />
          <RectangleSelector
            width={this.getWidth()}
            height={this.getHeight()}
            onSetSelection={this.props.onSetSelection} />
      </div>
    );
  }

  getWidth() {
    return this.props.image.naturalWidth;
  }

  getHeight() {
    return this.props.image.naturalHeight;
  }
}

export default CanvasSet;
