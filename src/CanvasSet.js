import React, { Component } from 'react';
import Canvas from './Canvas.js';
import RectangleSelector from './RectangleSelector.js';
import './CanvasSet.css';

class CanvasSet extends Component {
  constructor(props) {
    super(props);

    // this.props.image can be a HTMLImageElement (aka Image()), or a URL to a video.

    if (this.props.image instanceof HTMLImageElement) {
      this.state = {
        drawable: this.props.image
      };
    } else if (typeof this.props.image === "string") {
      // it's a video URL. we need to set a timer
      // todo: requestAnimationFrame instead.
      this.state = {
        videoUpdateIntervalId: setInterval(() => { this.videoUpdateFrame(); }, 100),
        drawable: new Image(100, 100) // a loading image while the video element is still rendering
      };
    }

    this.getVideoElement = this.getVideoElement.bind(this);
    this.videoUpdateFrame = this.videoUpdateFrame.bind(this);
  }

  videoUpdateFrame() {
    this.setState({
      drawable: this.videoElement
    });
    console.log('.');
  }

  render() {
    const style = {
      width: this.getWidth(),
      height: this.getHeight()
    };

    return (
      <div style={style} className="canvas-set">
        <Canvas
          image={this.state.drawable}
          width={this.getWidth()}
          height={this.getHeight()}
          masks={this.props.masks}
        />
        <RectangleSelector
          width={this.getWidth()}
          height={this.getHeight()}
          onSelection={this.props.onSelection}
        />
        {this.getVideoElement()}
      </div>
    );
  }

  getVideoElement() {
    if (this.props.image instanceof HTMLImageElement) {
      return null; // not a video, it's an image, so don't render any <video> element
    }

    const onLoadedData = (e) => {
      // you might also consider onLoadedMetadata
      this.setState({
        videoWidth: e.target.videoWidth,
        videoHeight: e.target.videoHeight
      });
    };

    return <video
      style={{ display: 'none' }}
      src={this.props.image}
      autoPlay
      loop
      ref={(me) => { this.videoElement = me; }}
      onLoadedData={(e) => onLoadedData(e)}
    />;
  }

  componentWillUnmount() {
    // stop the invisible video-to-canvas drawing loop
    clearInterval(this.state.videoUpdateIntervalId);
  }

  getWidth() {
    return this.state.drawable.naturalWidth || this.state.videoWidth; // todo: real dimensions
  }

  getHeight() {
    return this.state.drawable.naturalHeight || this.state.videoWidth;
  }
}

export default CanvasSet;
