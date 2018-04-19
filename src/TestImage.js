import React from 'react';
import ReactDOM from 'react-dom';
import testImageFile from './testmekominus.jpg';

export default class TestImage extends React.Component {
  render() {
    return (
      <img style={{ display: "none" }} onLoad={this.onLoad} src={testImageFile} alt="..."></img>
    );
  }

  onLoad = (e) => {
    const imgEl = ReactDOM.findDOMNode(this);
    this.props.setImage(imgEl);
  }
}
