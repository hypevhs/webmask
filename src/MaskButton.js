import React, { Component } from 'react';

class MaskButton extends Component {
  render() {
    return (
      <button onClick={this.props.onClick} className="toolbar-button" style={{
        backgroundImage: `url("${this.props.img}")`
      }} title={this.props.text}></button>
    );
  }
}

export default MaskButton;
