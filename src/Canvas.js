import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InvertMask from './masks/InvertMask.js';
import FLMask from './masks/FLMask.js';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.repaint = this.repaint.bind(this);
  }

  render() {
    return (
      <canvas
        width={this.props.width}
        height={this.props.height}
        className="canvas-canvas">Canvas not supported.</canvas>
    );
  }

  componentDidMount() {
    var ctx = this.getContext();
    this.repaint(ctx);
  }

  componentDidUpdate() {
    var ctx = this.getContext();
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    this.repaint(ctx);
  }

  repaint(ctx) {
    ctx.save();
    ctx.drawImage(this.props.image, 0, 0);
    this.applyMasks();
    ctx.restore();
  }

  applyMasks() {
    if (!this.props.masks || !this.props.masks.length) {
      console.log("Applying no masks.");
      return;
    }

    console.log(`Applying ${this.props.masks.length} masks.`);

    var ctx = this.getContext();
    for (var i = 0; i < this.props.masks.length; i++) {
      var here = this.props.masks[i];
      var selection = { x:here.x, y:here.y, w:here.w, h:here.h };
      console.log(`Mask #${i}: ${here.type} at ${selection.x},${selection.y},${selection.w},${selection.h}`);
      switch (here.type) {
        case "invert":
          new InvertMask().applyMask(ctx, selection);
          break;
        case "fl":
          new FLMask().applyMask(ctx, selection);
          break;
        default:
          console.log("Unknown mask type");
          break;
      }
    }
  }

  getContext() {
    return ReactDOM.findDOMNode(this).getContext('2d');
  }
}

export default Canvas;
