


import React, { Component } from 'react';
import Canvas from "./Canvas.js";
import RectangleSelector from "./RectangleSelector.js"

class CanvasSet extends Component {
  render() {
    return (
      <div style={{
        width: this.props.image.naturalWidth || 640,
        height: this.props.image.naturalHeight || 480,
        display: "inline-block",
        border: "1px solid black"
      }}>
        <Canvas
          image={this.props.image}
          masks={this.props.operations} />
        <RectangleSelector
          width={this.props.image.naturalWidth || 640}
          height={this.props.image.naturalHeight || 480}
          onSetSelection={this.props.onSetSelection} />
      </div>
    );
  }
}

export default CanvasSet;
