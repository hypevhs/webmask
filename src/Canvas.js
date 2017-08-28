import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.repaint = this.repaint.bind(this);
  }

  render() {
    return (
      <canvas
        width={this.props.image.width}
        height={this.props.image.height}
        style={{border: "1px solid black"}}>Canvas not supported.</canvas>
    );
  }

  componentDidMount() {
    console.log('mount');
    var ctx = ReactDOM.findDOMNode(this).getContext('2d');
    this.repaint(ctx);
  }

  componentDidUpdate() {
    console.log('update');
    var ctx = ReactDOM.findDOMNode(this).getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    this.repaint(ctx);
  }

  repaint(ctx) {
    ctx.save();
    ctx.drawImage(this.props.image, 0, 0);
    ctx.restore();
  }
}

export default Canvas;
