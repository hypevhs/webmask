import React from 'react';
import './Toolbar.css'
import MaskButton from './MaskButton.js';
import ImageShiftRGB from './buttons/shiftrgb.svg';
import ImageXOR from './buttons/xor.svg';
import ImageInvert from './buttons/invert.svg';
import ImageFlipVert from './buttons/flipvert.svg';
import ImageFlipHoriz from './buttons/fliphoriz.svg';
import ImageVertGlass from './buttons/vertglass.svg';
import ImageHorizGlass from './buttons/horizglass.svg';
import ImageWin from './buttons/win.svg';
import ImageMekoPlus from './buttons/mekoplus.svg';
import ImageMekoMinus from './buttons/mekominus.svg';
import ImageFL from './buttons/fl.svg';
import ImageQ0 from './buttons/q0.svg';

export default class Toolbar extends React.Component {
  render() {
    return (
      <div className="toolbar">
        <MaskButton text="Shift RGB" img={ImageShiftRGB} onClick={() => this.props.addMask("shiftrgb")} />
        <MaskButton text="XOR 0x80" img={ImageXOR} onClick={() => this.props.addMask("xor")} />
        <MaskButton text="Invert" img={ImageInvert} onClick={() => this.props.addMask("invert")} />
        <MaskButton text="Flip Vertically" img={ImageFlipVert} onClick={() => this.props.addMask("flipvert")} />
        <MaskButton text="Flip Horizontally" img={ImageFlipHoriz} onClick={() => this.props.addMask("fliphoriz")} />
        <MaskButton text="Vertical Glass" img={ImageVertGlass} onClick={() => this.props.addMask("vertglass")} />
        <MaskButton text="Horizontal Glass" img={ImageHorizGlass} onClick={() => this.props.addMask("horizglass")} />
        <MaskButton text="Win" img={ImageWin} onClick={() => this.props.addMask("win")} />
        <MaskButton text="Meko +" img={ImageMekoPlus} onClick={() => this.props.addMask("mekoplus")} />
        <MaskButton text="Meko -" img={ImageMekoMinus} onClick={() => this.props.addMask("mekominus")} />
        <MaskButton text="FL" img={ImageFL} onClick={() => this.props.addMask("fl")} />
        <MaskButton text="Q0" img={ImageQ0} onClick={() => this.props.addMask("q0")} />
      </div>
    );
  }
}
