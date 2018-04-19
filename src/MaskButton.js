import React from 'react';

export default class MaskButton extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick} className="toolbar-button" style={{
        backgroundImage: `url("${this.props.img}")`
      }} title={this.props.text}></button>
    );
  }
}
