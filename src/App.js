import React from 'react';
import './App.css';
import Toolbar from './Toolbar.js';
import CanvasSet from './CanvasSet.js';
import UndoList from './UndoList.js';
import FullScreenDropZone from './FullScreenDropZone.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      canvasW: 100,
      canvasH: 100,
      masks: [
      ],
      selection: {
        x: 0,
        y: 0,
        w: 0,
        h: 0
      }
    };
  }

  render() {
    let workspace;
    if (!!this.state.image) {
      workspace = (
        <div className="workspace">
          <div className="undo-list-fake" />
          <CanvasSet
            image={this.state.image}
            width={this.state.canvasW}
            height={this.state.canvasH}
            masks={this.state.image ? this.state.masks : []}
            onSelection={this.setSelection} />
          <UndoList
            masks={this.state.masks}
            resetMasksToIdx={this.resetMasksToIdx} />
        </div>
      );
    } else {
      workspace = (
        <div className="workspace">
          <div className="no-file-loaded">No file loaded.<br /><br />Drag an image here or click the Open button.</div>
        </div>
      );
    }

    return (
      <div className="app">
        <FullScreenDropZone onNewImage={this.setImage}>
          <Toolbar addMask={this.addMask} />
          {workspace}
        </FullScreenDropZone>
      </div>
    );
  }

  setImage = (img, w, h) => {
    this.setState({
      image: img,
      canvasW: w,
      canvasH: h,
      masks: [], // should reset masks and selection when loading a new file
      selection: {
        x: 0,
        y: 0,
        w: 0,
        h: 0
      }
    });
  }

  setSelection = (xywh) => {
    this.setState({ selection: xywh });
  }

  addMask = (type) => {
    if (this.state.selection.w === 0 || this.state.selection.h === 0) {
      return; // todo: toast(please select something first)
    }
    // append mask object to this.state.mask (an array)
    this.setState((state) => {
      const newMasks = [
        ...state.masks, {
          type,
          ...state.selection
        }
      ];
      return {
        masks: newMasks
      }
    });
  }

  resetMasksToIdx = (idx) => {
    // todo: sanitize
    this.setState((state) => {
      const masks = state.masks.slice(0, idx);
      return { masks };
    });
  }
}
