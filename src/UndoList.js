import React, { Component } from 'react';
//import './UndoList.css';

class UndoList extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <td>{this.props.masks.length} masks</td>
          </tr>
          <tr>
            <td>Type</td>
            <td>Area</td>
          </tr>
        </thead>
        <tbody>
          {this.getRows()}
        </tbody>
      </table>
    );
  }

  getRows() {
    var rows = this.props.masks.map((here, idx) => {
      return <tr key={idx}>
        <td>{here.type}</td>
        <td>{`{${here.x}, ${here.y}, ${here.w}, ${here.h}}`}</td>
      </tr>;
    });
    return rows;
  }
}

export default UndoList;
