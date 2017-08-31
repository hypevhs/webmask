import React, { Component } from 'react';
import MaskButton from './MaskButton.js';
import ImageInvert from './buttons/invert.svg';

class Toolbar extends Component {
  render() {
    return (
      <div className="toolbar">
        <MaskButton text="Shift RGB" />
        <MaskButton text="XOR 0x80" />
        <MaskButton text="Invert" img={ImageInvert} onClick={() => this.props.addMask("invert")} />
        <MaskButton text="Flip Vertically" />
        <MaskButton text="Flip Horizontally" />
        <MaskButton text="Vertical Glass" />
        <MaskButton text="Horizontal Glass" />
        <MaskButton text="Win" />
        <MaskButton text="Meko +" />
        <MaskButton text="Meko -" />
        <MaskButton text="FL" onClick={() => this.props.addMask("fl")} />
        <MaskButton text="Q0" />
      </div>
    );
  }
}

export default Toolbar;
