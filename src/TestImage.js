import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import testImageFile from './testmekominus.jpg';

class TestImage extends Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
  }

  render() {
    return (
      <img style={{ display: "none" }} onLoad={this.onLoad} src={testImageFile} alt="..."></img>
    );
  }

  onLoad(e) {
    var imgEl = ReactDOM.findDOMNode(this);
    this.props.setImage(imgEl);
  }
}

export default TestImage;
