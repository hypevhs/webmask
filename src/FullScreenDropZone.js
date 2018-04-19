import React from 'react';
import Dropzone from 'react-dropzone'

export default class FullScreenDropZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropzoneActive: false,
      tempVideoSrc: null
    }
  }

  onDragEnter = () => {
    this.setState({
      dropzoneActive: true
    });
  }

  onDragLeave = () => {
    this.setState({
      dropzoneActive: false
    });
  }

  onDrop = () => {
    this.setState({
      dropzoneActive: false
    });
  }

  onDropAccepted = (files) => {
    console.log(files);
    // clear out the old src blob url, in case we switch from video to something else
    this.setState({ tempVideoSrc: null });
    if (files[0].type === "video/mp4") {
      this.tryLoadVideo(files[0]);
    } else {
      this.tryLoadImage(files[0]);
    }
  }

  tryLoadImage(file) {
    const img = new Image();
    img.onload = () => {
      console.log("new image loaded");
      this.props.onNewImage(img, img.naturalWidth, img.naturalHeight);
    }
    img.src = URL.createObjectURL(file);
  }

  tryLoadVideo(file) {
    const tempVideoSrc = URL.createObjectURL(file);
    this.setState({ tempVideoSrc });
    // once the state is set here, a <video> tag will render the blob URL invisibly.
    // then, we'll just wait for <video> to finish loading before callback-ing.
  }

  getTempVideo() {
    // if we have a video file to load, let's make a temporary <video> tag and listen for its loading events.
    return <video
      style={{ display: 'none' }}
      src={this.state.tempVideoSrc}
      ref={(me) => { this.videoTag = me; }}
      onLoadedMetadata={() => {
        // why onLoadedMetadata? https://stackoverflow.com/a/9333276/1364757
        console.log(`new video loaded with ${this.videoTag.videoWidth},${this.videoTag.videoHeight}`);
        this.props.onNewImage(this.state.tempVideoSrc, this.videoTag.videoWidth, this.videoTag.videoHeight);
      }}
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
