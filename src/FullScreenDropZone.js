import React, { Component } from 'react';
import Dropzone from 'react-dropzone'

class FullScreenDropZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropzoneActive: false,
      tempVideoSrc: null
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
    this.setState({ tempVideoTag: null });
    if (files[0].type === "video/mp4") {
      this.tryLoadVideo(files[0]);
    } else {
      this.tryLoadImage(files[0]);
    }
  }

  tryLoadImage(file) {
    const img = new Image();
    img.onload = () => {
      console.log("image loaded...");
      this.props.onNewImage(img);
    }
    img.src = URL.createObjectURL(file);
  }

  tryLoadVideo(file) {
    const tempVideoSrc = URL.createObjectURL(file);
    this.setState({ tempVideoSrc });
  }

  getTempVideo() {
    // if we have a video file to load, let's use a temporary video tag with its events.
    return <video
      style={{ display: 'none' }}
      src={this.state.tempVideoSrc}
      onLoadedData={() => {
        // or you could try onLoadedMetadata
        console.log('onLoadedData');
        this.props.onNewImage(this.state.tempVideoSrc);
      }}
      onPlay={() => { console.log('onPlay'); }}
    />;
  }

  render() {
    return (
      <Dropzone
        disableClick
        style={{}}
        accept='image/gif, image/jpeg, image/png, image/svg+xml, video/mp4'
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onDropAccepted={this.onDropAccepted}
      >
        { this.state.tempVideoSrc && this.getTempVideo() }
        { this.state.dropzoneActive && <div className='dropzone-overlay'>Drop image files...</div> }
        {this.props.children}
      </Dropzone>
    );
  }
}

export default FullScreenDropZone;
