import React from 'react';
import ReactDOM from 'react-dom';

/**
 * @class RectangleSelector
 * @extends {Component}
 * @see http://atomicrobotdesign.com/blog/javascript/draw-a-rectangle-using-the-mouse-on-the-canvas-in-less-than-40-lines-of-javascript/
 */
export default class RectangleSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseOverX: -99,
      mouseOverY: -99,
      x1: 0, // "from" mouse coordinates
      y1: 0,
      x2: 0, // "to" mouse coordinates
      y2: 0,
      dragging: false,
      antsId: 0, // return value of requestAnimationFrame
      antsOffset: 0 // marching ants animation counter
    };
  }

  render() {
    return (
      <canvas
        width={this.props.width}
        height={this.props.height}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseMove={this.onMouseMove}
        onMouseLeave={this.onMouseLeave}
        className="canvas-rectangle">Canvas not supported.</canvas>
    );
  }

  componentDidMount() {
    const ctx = ReactDOM.findDOMNode(this).getContext('2d');
    this.repaint(ctx);
    this.antsUpdate();
  }

  componentDidUpdate() {
    const ctx = ReactDOM.findDOMNode(this).getContext('2d');
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
    ctx.setLineDash([4,6]);

    this.drawSelectionAnts(ctx);
    this.drawCursor(ctx);

    ctx.restore();
  }

  drawSelectionAnts(ctx) {
    const xywh = this.getRealSelect();
    if (xywh.w === 0 || xywh.h === 0)
      return;
    ctx.strokeStyle = "black";
    ctx.lineDashOffset = 0+this.state.antsOffset;
    ctx.strokeRect(xywh.x, xywh.y, xywh.w-1, xywh.h-1);

    ctx.strokeStyle = "white";
    ctx.lineDashOffset = 5+this.state.antsOffset;
    ctx.strokeRect(xywh.x, xywh.y, xywh.w-1, xywh.h-1);
  }

  drawCursor(ctx) {
    const cellX = this.blockFloor(this.state.mouseOverX);
    const cellY = this.blockFloor(this.state.mouseOverY);

    ctx.save();
    ctx.setLineDash([]);
    ctx.strokeStyle = "red";
    ctx.strokeRect(cellX, cellY, 8-1, 8-1);
    ctx.restore();
  }

  onMouseDown = (e) => {
    if (e.button !== 0) { return; }
    const mouse = this.getMouseCoords(e);
    this.setState({ x1: mouse.x, y1: mouse.y, x2: mouse.x, y2: mouse.y, dragging: true });
    e.preventDefault();
  }

  onMouseUp = (e) => {
    if (e.button !== 0) { return; }
    this.setState({ dragging: false });
    const xywh = this.getRealSelect();
    // pass active selection range to parent
    this.props.onSelection(xywh);
    e.preventDefault();
  }

  getRealSelect() {
    // check for non-dragging single left click that deselects all
    if (this.state.x1 === this.state.x2 && this.state.y1 === this.state.y2) {
      return { x:0,y:0,w:0,h:0 };
    }

    // ensure that coords are all positive, in case of a BotRight-to-TopLeft (aka "backwards") selection
    let x = Math.min(this.state.x1, this.state.x2);
    let y = Math.min(this.state.y1, this.state.y2);
    let x2 = Math.max(this.state.x1, this.state.x2);
    let y2 = Math.max(this.state.y1, this.state.y2);
    // round to 8x8 blocks
    x = this.blockFloor(x);
    y = this.blockFloor(y);
    x2 = this.blockCeil(x2);
    y2 = this.blockCeil(y2);
    const w = x2 - x;
    const h = y2 - y;
    return { x, y, w, h };
  }

  onMouseMove = (e) => {
    const mouse = this.getMouseCoords(e);
    if (this.state.dragging) {
      this.setState({ x2: mouse.x, y2: mouse.y, mouseOverX: mouse.x, mouseOverY: mouse.y });
    } else {
      this.setState({ mouseOverX: mouse.x, mouseOverY: mouse.y });
    }
    e.preventDefault();
  }

  onMouseLeave = (e) => {
    this.setState({ mouseOverX: -99, mouseOverY: -99 });
  }

  getMouseCoords(e) {
    const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    let localX = e.clientX - rect.left;
    let localY = e.clientY - rect.top;
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

  antsUpdate = () => {
    const antsId = requestAnimationFrame(this.antsUpdate);
    this.setState((ps) => {
      return {
        antsOffset: ps.antsOffset - 1,
        antsId: antsId
      };
    });
  }
}
