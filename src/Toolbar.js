import React, { Component } from 'react';
import MaskButton from './MaskButton.js';

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.addMask = this.addMask.bind(this);
  }

  render() {
    return (
      <div className="toolbar">
        <MaskButton text="Rotate CCW" />
        <MaskButton text="Rotate CW" />
        <MaskButton text="Shift RGB" />
        <MaskButton text="XOR 0x80" />
        <MaskButton text="Invert" onClick={() => this.addMask("invert")} />
        <MaskButton text="Flip Vertically" />
        <MaskButton text="Flip Horizontally" />
        <MaskButton text="Vertical Glass" />
        <MaskButton text="Horizontal Glass" />
        <MaskButton text="Win" />
        <MaskButton text="Meko +" />
        <MaskButton text="Meko -" />
        <MaskButton text="FL" onClick={() => this.addMask("fl")} />
        <MaskButton text="Q0" />
      </div>
    );
  }

  addMask(type) {
    this.props.addMask(type);
  }

}

export default Toolbar;
