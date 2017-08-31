import React, { Component } from 'react';

class MaskButton extends Component {
  render() {
    return (
      <button onClick={this.props.onClick} style={{
        width: "64px",
        height: "64px",
        backgroundImage: `url("${this.props.img}")`,
        backgroundSize: 'cover'
      }} title={this.props.text}></button>
    );
  }
}

export default MaskButton;
