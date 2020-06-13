class Controller {
  constructor(model, view){
    this.model = model;
    this.view = view;


    this.view.bindToggleWithBodyPix(this.toggleWithBodyPix);
    this.view.bindToggleWithFaceApi(this.toggleWithFaceApi);

    // select video
    this.view.bindSelectVideoHandler(this.handleSelectVideo);
    // TODO process video

    // save button
    this.view.bindSaveVideoHandler(this.handleSaveVideo);

    this.model.bindBodyPixInputChanged(this.updateBodyPixChecked)
    this.model.bindFaceApiInputChanged(this.updateFaceApiChecked)
    this.model.bindVideoNameChanged(this.updateVideoName);

    // initialize UI with model state
    this.init()
  }

  init = () =>{
    this.updateFaceApiChecked();
    this.updateBodyPixChecked();
    this.updateVideoName(this.model.state.videoName);
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