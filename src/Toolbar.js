import React from 'react';
import './Toolbar.css'
import MaskButton from './MaskButton';
import ImageShiftRGB from '!file-loader!./buttons/shiftrgb.svg';
import ImageXOR from '!file-loader!./buttons/xor.svg';
import ImageInvert from '!file-loader!./buttons/invert.svg';
import ImageFlipVert from '!file-loader!./buttons/flipvert.svg';
import ImageFlipHoriz from '!file-loader!./buttons/fliphoriz.svg';
import ImageVertGlass from '!file-loader!./buttons/vertglass.svg';
import ImageHorizGlass from '!file-loader!./buttons/horizglass.svg';
import ImageWin from '!file-loader!./buttons/win.svg';
import ImageMekoPlus from '!file-loader!./buttons/mekoplus.svg';
import ImageMekoMinus from '!file-loader!./buttons/mekominus.svg';
import ImageFL from '!file-loader!./buttons/fl.svg';
import ImageQ0 from '!file-loader!./buttons/q0.svg';

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
