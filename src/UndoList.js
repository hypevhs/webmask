import React from 'react';
import './UndoList.css';

export default class UndoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseIdx: undefined
    };
  }

  render() {
    return (
      <div className="undo-list">
        <header>History</header>
        <table className="undo-list-table-header">
          <thead>
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
    const rows = this.props.masks.map((here, idx) => {
      const rowClass = (idx >= this.state.mouseIdx) ? "highlight-deleting" : null;
      return <tr key={idx} onClick={this.undoToHere(idx)} onMouseOver={this.setMouseIdx(idx)} className={rowClass}>
        <td>{here.type}</td>
        <td>{`{${here.x}, ${here.y}, ${here.w}, ${here.h}}`}</td>
      </tr>;
    });
    return rows;
  }

  undoToHere = (idx) => {
    return () => {
      this.setMouseIdx(undefined)();
      this.props.resetMasksToIdx(idx);
    };
  }

  setMouseIdx = (idx) => {
    return () => {
      this.setState({ mouseIdx: idx });
    };
  }
}
