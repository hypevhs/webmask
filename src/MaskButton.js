import React, { Component } from 'react';

class MaskButton extends Component {
  render() {
    return (
      <button onClick={this.props.onClick}>{this.props.text}</button>
    );
  }
}

export default MaskButton;
