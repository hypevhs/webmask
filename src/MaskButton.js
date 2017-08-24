import React, { Component } from 'react';

class MaskButton extends Component {
  render() {
    return (
      <button>{this.props.text}</button>
    );
  }
}

export default MaskButton;
