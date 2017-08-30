import React, { Component } from 'react';
import Canvas from './Canvas.js';
import RectangleSelector from './RectangleSelector.js';
import './CanvasSet.css';

class CanvasSet extends Component {
  render() {
    // only render canvases if an image is loaded
    var set = <div>
      <Canvas
        image={this.props.image}
        width={this.getWidth()}
        height={this.getHeight()}
        masks={this.props.masks} />
      <RectangleSelector
        width={this.getWidth()}
        height={this.getHeight()}
        onSetSelection={this.props.onSetSelection} />
    </div>;

    return (
      <div style={{
        width: this.getWidth(),
        height: this.getHeight()
      }} className="canvas-set">
        {!!this.props.image ? set : null}
      </div>
    );
  }

  getWidth() {
    if (this.props.image) {
      return this.props.image.naturalWidth;
    }
    return 640;
  }

  getHeight() {
    if (this.props.image) {
      return this.props.image.naturalHeight;
    }
    return 480;
  }
}

export default CanvasSet;
