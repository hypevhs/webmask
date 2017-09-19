import React from 'react';
import ReactDOM from 'react-dom';
import Canvas from './Canvas.js';

// todo: use composition, not inheritance
class CanvasWithVideo extends Canvas {
  constructor(props) {
    super(props);

    // return value of requestAnimationFrame
    // let's not worry about React state.
    this.rafId = 0;

    this.frameUpdate = this.frameUpdate.bind(this);
  }

  componentDidMount() {
    super.componentDidMount();
    this.frameUpdate();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    cancelAnimationFrame(this.rafId);
  }

  render() {
    return (
      <div>
        {super.render()}
        {this.renderVideo()}
      </div>
    );
  }

  renderVideo() {
    return <video
      style={{ display: 'none' }}
      src={this.props.image}
      autoPlay
      loop
      ref={(me) => { this.videoDom = me; }}
    />;
  }

  frameUpdate() {
    this.rafId = requestAnimationFrame(this.frameUpdate);
    this.repaint(this.getContext());
  }

  getImage() {
    // use a <video> element for canvas drawImage
    // it's kind of crazy that this is supported
    return this.videoDom;
  }

  getContext() {
    // sometimes you just gotta use DOM, and refs don't cut it.
    // React purists never made any real apps anyway, so don't listen to their NEVER this or ALWAYS that.
    return ReactDOM.findDOMNode(this).childNodes[0].getContext('2d');
  }
}

export default CanvasWithVideo;
