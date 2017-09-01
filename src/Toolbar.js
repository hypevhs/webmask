import React, { Component } from 'react';
import './Toolbar.css'
import MaskButton from './MaskButton.js';
import ImageShiftRGB from './buttons/shiftrgb.svg';
import ImageXOR from './buttons/shiftrgb.svg';
import ImageInvert from './buttons/invert.svg';
import ImageFlipVert from './buttons/shiftrgb.svg';
import ImageFlipHoriz from './buttons/shiftrgb.svg';
import ImageVertGlass from './buttons/shiftrgb.svg';
import ImageHorizGlass from './buttons/shiftrgb.svg';
import ImageWin from './buttons/shiftrgb.svg';
import ImageMekoPlus from './buttons/mekoplus.svg';
import ImageMekoMinus from './buttons/mekominus.svg';
import ImageFL from './buttons/fl.svg';
import ImageQ0 from './buttons/shiftrgb.svg';

class Toolbar extends Component {
  render() {
    return (
      <div className="toolbar">
        <MaskButton text="Shift RGB" img={ImageShiftRGB} />
        <MaskButton text="XOR 0x80" img={ImageXOR} />
        <MaskButton text="Invert" img={ImageInvert} onClick={() => this.props.addMask("invert")} />
        <MaskButton text="Flip Vertically" img={ImageFlipVert} />
        <MaskButton text="Flip Horizontally" img={ImageFlipHoriz} />
        <MaskButton text="Vertical Glass" img={ImageVertGlass} />
        <MaskButton text="Horizontal Glass" img={ImageHorizGlass} />
        <MaskButton text="Win" img={ImageWin} />
        <MaskButton text="Meko +" img={ImageMekoPlus} />
        <MaskButton text="Meko -" img={ImageMekoMinus} />
        <MaskButton text="FL" img={ImageFL} onClick={() => this.props.addMask("fl")} />
        <MaskButton text="Q0" img={ImageQ0} />
      </div>
    );
  }
}

export default Toolbar;
