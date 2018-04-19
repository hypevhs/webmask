import React from 'react';
import ReactDOM from 'react-dom';
import ShiftRgbMask from './masks/ShiftRgbMask.js';
import XorMask from './masks/XorMask.js';
import InvertMask from './masks/InvertMask.js';
import { FlipVertMask, FlipHorizMask } from './masks/FlipMask.js';
import { VertGlassMask, HorizGlassMask } from './masks/GlassMask.js';
import WinMask from './masks/WinMask.js';
import { MekoPlusMask, MekoMinusMask } from './masks/MekoMask.js';
import FLMask from './masks/FLMask.js';
import Q0Mask from './masks/Q0Mask.js';

export default class Canvas extends React.Component {
  render() {
    return (
      <canvas
        width={this.props.width}
        height={this.props.height}
        className="canvas-canvas">Canvas not supported.</canvas>
    );
  }

  componentDidMount() {
    const ctx = this.getContext();
    this.repaint(ctx);
  }

  componentDidUpdate() {
    const ctx = this.getContext();
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    this.repaint(ctx);
  }

  repaint = (ctx) => {
    ctx.save();
    ctx.drawImage(this.props.getImage(), 0, 0);
    this.applyMasks();
    ctx.restore();
  }

  applyMasks() {
    if (!this.props.masks || !this.props.masks.length) {
      return;
    }

    const ctx = this.getContext();

    const maskMap = {
      shiftrgb: new ShiftRgbMask(),
      xor: new XorMask(),
      invert: new InvertMask(),
      flipvert: new FlipVertMask(),
      fliphoriz: new FlipHorizMask(),
      vertglass: new VertGlassMask(),
      horizglass: new HorizGlassMask(),
      win: new WinMask(),
      mekoplus: new MekoPlusMask(),
      mekominus: new MekoMinusMask(),
      fl: new FLMask(),
      q0: new Q0Mask()
    };

    for (let theMask of this.props.masks) {
      const maskFunc = maskMap[theMask.type];
      if (!maskFunc) {
        console.log(`Unknown mask type ${theMask.type}`);
        continue;
      }
      const selection = { x: theMask.x, y: theMask.y, w: theMask.w, h: theMask.h };
      maskFunc.applyMask(ctx, selection);
    }
  }

  getContext() {
    return ReactDOM.findDOMNode(this).getContext('2d');
  }
}
