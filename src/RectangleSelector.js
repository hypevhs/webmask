import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/**
 * @class RectangleSelector
 * @extends {Component}
 * @see http://atomicrobotdesign.com/blog/javascript/draw-a-rectangle-using-the-mouse-on-the-canvas-in-less-than-40-lines-of-javascript/
 */
class RectangleSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      dragging: false,
      antsId: 0,
      antsOffset: 0
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.antsUpdate = this.antsUpdate.bind(this);
  }

  render() {
    return (
      <canvas
        width={this.props.width}
        height={this.props.height}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseMove={this.onMouseMove}
        style={{position: "absolute"}}>Canvas not supported.</canvas>
    );
  }

  componentDidMount() {
    console.log('mount');
    var ctx = ReactDOM.findDOMNode(this).getContext('2d');
    this.repaint(ctx);
    this.antsUpdate();
  }

  componentDidUpdate() {
    var ctx = ReactDOM.findDOMNode(this).getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    this.repaint(ctx);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.state.antsId);
  }

  repaint(ctx) {
    ctx.save();
    ctx.translate(0.5, 0.5); // fixes line thickness, but breaks line dashes!
    ctx.lineWidth = 1;
    var xywh = this.getRealSelect();
    ctx.setLineDash([4,6]);

    ctx.strokeStyle = "black";
    ctx.lineDashOffset = 0+this.state.antsOffset;
    ctx.strokeRect(xywh.x, xywh.y, xywh.w, xywh.h);

    ctx.strokeStyle = "white";
    ctx.lineDashOffset = 5+this.state.antsOffset;
    ctx.strokeRect(xywh.x, xywh.y, xywh.w, xywh.h);

    ctx.restore();
  }

  onMouseDown(e) {
    var mouse = this.getMouse(e);
    this.setState({ x1: mouse.x, y1: mouse.y, x2: mouse.x, y2: mouse.y, dragging: true });
    e.preventDefault();
  }

  onMouseUp(e) {
    this.setState({ dragging: false });
    var xywh = this.getRealSelect();
    // pass active selection range to parent
    this.props.onSetSelection(xywh);
    e.preventDefault();
  }

  getRealSelect() {
    // check for non-dragging single left click that deselects all
    if (this.state.x1 === this.state.x2 && this.state.y1 === this.state.y2) {
      return { x:0,y:0,w:0,h:0 };
    }

    // ensure that coords are all positive, in case of a BotRight-to-TopLeft (aka "backwards") selection
    var x = Math.min(this.state.x1, this.state.x2);
    var y = Math.min(this.state.y1, this.state.y2);
    var x2 = Math.max(this.state.x1, this.state.x2);
    var y2 = Math.max(this.state.y1, this.state.y2);
    // round to 8x8 blocks
    x = this.blockFloor(x);
    y = this.blockFloor(y);
    x2 = this.blockCeil(x2);
    y2 = this.blockCeil(y2);
    var w = x2 - x;
    var h = y2 - y;
    return {x:x,y:y,w:w,h:h};
  }

  onMouseMove(e) {
    var mouse = this.getMouse(e);
    if (this.state.dragging) {
      this.setState({ x2: mouse.x, y2: mouse.y });
    }
    e.preventDefault();
  }

  getMouse(e) {
    var rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    var localX = e.clientX - rect.left;
    var localY = e.clientY - rect.top;
    localX += 0.1; // corner case where selection start is ON a 8x8 gridline, breaking the floor/ceil for backwards selections
    localY += 0.1; // FIXME: bug or feature ??
    return { x: localX, y: localY };
  }

  blockFloor(n) {
    return Math.floor(n / 8) * 8;
  }

  blockCeil(n) {
    return Math.ceil(n / 8) * 8;
  }

  antsUpdate() {
    var antsId = requestAnimationFrame(this.antsUpdate);
    this.setState((ps) => {
      return {
        antsOffset: ps.antsOffset - 1,
        antsId: antsId
      };
    });
  }
}

export default RectangleSelector;
