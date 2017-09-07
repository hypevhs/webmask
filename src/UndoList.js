import React, { Component } from 'react';
import './UndoList.css';

class UndoList extends Component {
  constructor(props) {
    super(props);
    this.undoToHere = this.undoToHere.bind(this);
  }

  render() {
    return (
      <div className="undo-list">
        <table className="undo-list-table-header">
          <thead>
            {/* <tr>
              <th>{this.props.masks.length} masks</th>
            </tr> */}
            <tr>
              <th>Type</th>
              <th>Area</th>
            </tr>
          </thead>
        </table>
        <table className="undo-list-table">
          <tbody>
            {this.getRows()}
          </tbody>
        </table>
      </div>
    );
  }

  getRows() {
    var rows = this.props.masks.map((here, idx) => {
      return <tr key={idx} onClick={this.undoToHere}>
        <td>{here.type}</td>
        <td>{`{${here.x}, ${here.y}, ${here.w}, ${here.h}}`}</td>
      </tr>;
    });
    return rows;
  }

  undoToHere(e) {
    console.log(e, e.relatedTarget);
  }
}

export default UndoList;
