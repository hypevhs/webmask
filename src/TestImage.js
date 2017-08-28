import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import testImageFile from './testfl.png';

class TestImage extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  render() {
    return (
      <img onClick={this.clickHandler} src={testImageFile} alt="..."></img>
    );
  }

  clickHandler(e) {
    var imgEl = ReactDOM.findDOMNode(this);
    this.props.setImage(imgEl);
  }
}

export default TestImage;
