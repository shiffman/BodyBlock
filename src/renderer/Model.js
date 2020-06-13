const { ipcRenderer } = require("electron");

class Model {
  constructor(options = {}) {
    this.state = {
      videoPath: "",
      videoName: "no video selected",
      loading: false,
      status: "not started", // 'processing', 'done'
      withBodyPix: true,
      withFaceApi: true,
    };

    this.faceApi = options.faceApi || null;
    this.bodyPix = options.bodyPix || null;
  }

  toggleLoading = () => {
    const { loading } = this.state;
    this.state.loading = !loading;
  };

  toggleWithBodyPix = () => {
    const { withBodyPix } = this.state;
    console.log(
      `updating bodyPix status from ${withBodyPix} to ${!withBodyPix}`
    );
    this.state.withBodyPix = !withBodyPix;
    this.onBodyPixToggled(this.state.withBodyPix);
  };

  toggleWithFaceApi = () => {
    const { withFaceApi } = this.state;
    console.log(
      `updating faceApi status from ${withFaceApi} to ${!withFaceApi}`
    );
    this.state.withFaceApi = !withFaceApi;
    this.onFaceApiToggled(this.state.withFaceApi);
  };

  bindBodyPixInputChanged = (handler) => {
    this.onBodyPixToggled = handler;
  };
  bindFaceApiInputChanged = (handler) => {
    this.onFaceApiToggled = handler;
  };

  updateVideoPath = (newPath) => {
    if (!newPath)
      throw new Error(
        "new path must be passed, make sure to provide a file path"
      );
    this.state.videoPath = newPath;
    this.onVideoPathChanged(newPath);
  };

  updateVideoName = (name) => {
    if (!name)
      throw new Error(
        "name must be passed, make sure to provide the video name"
      );
    this.videoName = name;
    this.onVideoNameChanged(name);
  };

  bindVideoNameChanged = (handler) => {
    this.onVideoNameChanged = handler;
  };

  bindVideoPathChanged = (handler) => {
    this.onVideoPathChanged = handler;
  };

  updateStatus = (newStatus = "not started") => {
    // const {status} = this.state;
    if (!newStatus)
      throw new Error(
        'new status must be passed: "not started", "processing", "done"'
      );

    this.state.status = newStatus;
  };

  /**
   * Callback function that handles the file upload
   * @param {Object} evt
   */
  handleFileUpload = () => {
    // use the ipcRenderer object to pass messages to ipcMain
    // OPEN_FILE_UPLOAD will open up a dialog to select a file
    ipcRenderer.send("OPEN_FILE_UPLOAD");

    // We listen for a response with the filePath
    ipcRenderer.on("OPEN_FILE_UPLOAD", (evt, arg) => {
      console.log(arg);
      const videoPath = arg.filePaths[0];
      const videoName = this.videoPath.split("/").slice(-1).pop();

      this.updateVideoPath(videoPath);
      this.updateVideoName(videoName);
    });
  };

  handleSaveVideo = () => {
    ipcRenderer.send("SAVE_FILE");
    console.log("save file!");
  };
}

module.exports = Model;
