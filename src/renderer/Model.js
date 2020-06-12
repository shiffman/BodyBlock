class Model {
  constructor() {
    this.state = {
      videoPath: "",
      loading: false,
      status: "not started", // 'processing', 'done'
      withBodyPix: true,
      withFaceApi: true,
    };
  }

  updateVideoPath = (newPath) => {
    if (!newPath)
      throw new Error(
        "new path must be passed, make sure to provide a file path"
      );
    this.state.videoPath = newPath;
  };

  toggleLoading = () => {
    const { loading } = this.state;
    this.state.loading = !loading;
  };

  toggleWithBodyPix = () => {
    const { withBodyPix } = this.state;
    console.log(`updating bodyPix status from ${withBodyPix} to ${!withBodyPix}`);
    this.state.withBodyPix = !withBodyPix;
    this.onBodyPixToggled(this.state.withBodyPix);
  };

  toggleWithFaceApi = () => {
    const { withFaceApi } = this.state;
    console.log(`updating faceApi status from ${withFaceApi} to ${!withFaceApi}`);
    this.state.withFaceApi = !withFaceApi;
    this.onFaceApiToggled(this.state.withFaceApi);
  };

  bindBodyPixInputChanged = (handler) => {
    this.onBodyPixToggled = handler;
  }
  bindFaceApiInputChanged = (handler) => {
    this.onFaceApiToggled = handler;
  }

  updateStatus = (newStatus = "not started") => {
    // const {status} = this.state;
    if (!newStatus)
      throw new Error(
        'new status must be passed: "not started", "processing", "done"'
      );

    this.state.status = newStatus;
  };
}

module.exports = Model;
