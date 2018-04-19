import React from 'react';
import Canvas from './Canvas.js';
import CanvasWithVideo from './CanvasWithVideo.js';
import RectangleSelector from './RectangleSelector.js';
import './CanvasSet.css';

export default class CanvasSet extends React.Component {
  // this.props.image can be a HTMLImageElement (aka Image()), or a URL to a video.

  render() {
    const style = {
      width: this.props.width,
      height: this.props.height
    };

    return (
      <div style={style} className="canvas-set">
        {this.getActualCanvas()}
        <RectangleSelector
          width={this.props.width}
          height={this.props.height}
          onSelection={this.props.onSelection}
        />
      </div>
    );
  }

  getActualCanvas() {
    switch (this.getInputType()) {
      case 'image':
      return <Canvas
        getImage={() => { return this.props.image; }}
        width={this.props.width}
        height={this.props.height}
        masks={this.props.masks}
      />;
      case 'video':
      return <CanvasWithVideo
        videoSrc={this.props.image}
        width={this.props.width}
        height={this.props.height}
        masks={this.props.masks}
      />;
      default: return null;
    }
  }

  getInputType() {
    if (this.props.image instanceof HTMLImageElement) {
      return "image";
    } else if (typeof this.props.image === "string") {
      return "video";
    }
  }
}
