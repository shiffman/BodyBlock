class Controller {
  constructor(model, view){
    this.model = model;
    this.view = view;


    this.view.bindToggleWithBodyPix(this.toggleWithBodyPix);
    this.view.bindToggleWithFaceApi(this.toggleWithFaceApi);

    this.model.bindBodyPixInputChanged(this.updateBodyPixChecked)
    this.model.bindFaceApiInputChanged(this.updateFaceApiChecked)

    this.updateFaceApiChecked();
    this.updateBodyPixChecked();
  }

  toggleWithBodyPix = () => {
    this.model.toggleWithBodyPix();
  }
  
  toggleWithFaceApi= () => {
    this.model.toggleWithFaceApi();
  }


  updateFaceApiChecked = (bool) => {
    this.view.updateChecked('faceApi',bool)
  }

  updateBodyPixChecked = (bool) => {
    this.view.updateChecked('bodyPix',bool)
  }

  handleLoadingEvent = () => {
    this.model.toggleLoading();
  }

  handleUpdateStatus = (newStatus = "not started") => {
    this.model.updateStatus(newStatus);
  }

}

module.exports = Controller;