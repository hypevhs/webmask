import React, { Component } from 'react';
import Canvas from './Canvas.js';

class CanvasWithVideo extends Component {
  constructor(props) {
    super(props);

    // return value of requestAnimationFrame
    // let's not worry about React state.
    this.rafId = 0;

    this.frameUpdate = this.frameUpdate.bind(this);
    this.getImage = this.getImage.bind(this);
  }

  componentDidMount() {
    this.frameUpdate();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
  }

  render() {
    return (
      <div>
        <Canvas
          getImage={this.getImage}
          width={this.props.width}
          height={this.props.height}
          masks={this.props.masks}
          ref={(me) => { this.canvas = me; }}
        />
        {this.renderVideo()}
      </div>
    );
  }

  renderVideo() {
    return <video
      style={{ display: 'none' }}
      src={this.props.videoSrc}
      autoPlay
      loop
      ref={(me) => { this.videoDom = me; }}
    />;
  }

  frameUpdate() {
    this.rafId = requestAnimationFrame(this.frameUpdate);
    this.canvas.repaint(this.canvas.getContext());
  }

  getImage() {
    // use a <video> element for canvas drawImage
    // it's kind of crazy that this is supported
    // if it's not mounted yet, use a placeholder
    return this.videoDom || new Image(this.props.width, this.props.height);
  }
}

export default CanvasWithVideo;
