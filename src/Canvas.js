import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = { sqrX: 100 };
    this.handleClick = this.handleClick.bind(this);
    this.repaint = this.repaint.bind(this);
  }

  render() {
    return (
      <canvas width="320" height="240" style={{border: "1px solid black"}} onClick={this.handleClick}>Canvas not supported.</canvas>
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

  handleClick() {
    this.setState({ sqrX: this.state.sqrX + 10 });
  }

  repaint(ctx) {
    ctx.save();
    ctx.translate(this.state.sqrX, 100);
    ctx.fillStyle = '#F00';
    ctx.fillRect(-50, -50, 100, 100);
    ctx.restore();
  }
}

export default Canvas;
