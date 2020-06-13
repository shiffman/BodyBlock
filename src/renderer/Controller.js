class Controller {
  constructor(model, view){
    this.model = model;
    this.view = view;

    // toggle checkbox - bodypix
    this.view.bindToggleWithBodyPix(this.toggleWithBodyPix);
    this.model.bindBodyPixInputChanged(this.updateBodyPixChecked);
    // toggle checkbox - faceapi
    this.view.bindToggleWithFaceApi(this.toggleWithFaceApi);
    this.model.bindFaceApiInputChanged(this.updateFaceApiChecked)

    // select video
    this.view.bindSelectVideoHandler(this.handleSelectVideo);
    this.model.bindVideoNameChanged(this.updateVideoName);
    // TODO process video

    // save button
    this.view.bindSaveVideoHandler(this.handleSaveVideo);
    
    // changes the status of video processing
    this.model.bindVideoProcessingStatusChanged(this.updateVideoProcessingStatus);

    // initialize UI with model state
    this.init()
  }

  init = () =>{
    this.updateFaceApiChecked();
    this.updateBodyPixChecked();
    this.updateVideoName(this.model.state.videoName);
    this.updateVideoProcessingStatus(this.model.state.status);
  }

  toggleWithBodyPix = () => {
    this.model.toggleWithBodyPix();
  }
  
  toggleWithFaceApi= () => {
    this.model.toggleWithFaceApi();
  }


  updateFaceApiChecked = (bool) => {
    this.view.updateChecked('faceApi', bool)
  }

  updateBodyPixChecked = (bool) => {
    this.view.updateChecked('bodyPix', bool)
  }

  updateVideoName = (name) => {
    this.view.updateVideoFileName(name);
  }

  updateVideoProcessingStatus = (status) => {
    this.view.updateVideoProcessingStatus(status);
  }

  handleLoadingEvent = () => {
    this.model.toggleLoading();
  }

  handleUpdateStatus = (newStatus = "not started") => {
    this.model.updateStatus(newStatus);
  }

  handleSelectVideo = () => {
    this.model.handleFileUpload()
  }

  handleSaveVideo = () => {
    this.model.handleSaveVideo();
  }

}

module.exports = Controller;