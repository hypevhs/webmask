import React, { Component } from 'react';
import './UndoList.css';

class UndoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseIdx: undefined
    };

    this.undoToHere = this.undoToHere.bind(this);
    this.setMouseIdx = this.setMouseIdx.bind(this);
  }

  render() {
    return (
      <div className="undo-list">
        <table className="undo-list-table-header">
          <thead>
            <tr>
              <th>{this.props.masks.length} masks</th>
            </tr>
            <tr>
              <th>Type</th>
              <th>Area</th>
            </tr>
          </thead>
        </table>
        <table className="undo-list-table">
          <tbody onMouseLeave={this.setMouseIdx(undefined)} >
            {this.getRows()}
          </tbody>
        </table>
      </div>
    );
  }

  getRows() {
    var rows = this.props.masks.map((here, idx) => {
      const rowClass = (idx >= this.state.mouseIdx) ? "highlight-deleting" : null;
      return <tr key={idx} onClick={this.undoToHere(idx)} onMouseOver={this.setMouseIdx(idx)} className={rowClass}>
        <td>{here.type}</td>
        <td>{`{${here.x}, ${here.y}, ${here.w}, ${here.h}}`}</td>
      </tr>;
    });
    return rows;
  }

  undoToHere(idx) {
    return () => {
      this.props.resetMasksToIdx(idx);
    };
  }

  setMouseIdx(idx) {
    return () => {
      console.log(`mouseidx is now ${idx}`);
      this.setState({ mouseIdx: idx });
    };
  }
}

export default UndoList;
