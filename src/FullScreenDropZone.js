import React, { Component } from 'react';
import Dropzone from 'react-dropzone'

class FullScreenDropZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropzoneActive: false
    }

    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDropAccepted = this.onDropAccepted.bind(this);
  }

  onDragEnter() {
    this.setState({
      dropzoneActive: true
    });
  }

  onDragLeave() {
    this.setState({
      dropzoneActive: false
    });
  }

  onDrop() {
    this.setState({
      dropzoneActive: false
    });
  }

  onDropAccepted(files) {
    console.log(files);
    const img = new Image();
    img.onload = () => {
      console.log("image loaded...");
      this.props.onNewImage(img);
    }
    img.src = URL.createObjectURL(files[0]);
  }

  render() {
    return (
      <Dropzone
        disableClick
        style={{}}
        accept='image/gif, image/jpeg, image/png, image/svg+xml'
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onDropAccepted={this.onDropAccepted}
      >
        { this.state.dropzoneActive && <div className='dropzone-overlay'>Drop image files...</div> }
        {this.props.children}
      </Dropzone>
    );
  }
}

export default FullScreenDropZone;
