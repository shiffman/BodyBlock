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
    // this.onVideoPathChanged(newPath);
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

  // bindVideoPathChanged = (handler) => {
  //   this.onVideoPathChanged = handler;
  // };

  updateStatus = (newStatus = "not started") => {
    // const {status} = this.state;
    if (!newStatus)
      throw new Error(
        'new status must be passed: "not started", "processing", "done"'
      );

    this.state.status = newStatus;
    this.onVideoProcessingStatusChanged(newStatus);
  };

  bindVideoProcessingStatusChanged = (handler) => {
    this.onVideoProcessingStatusChanged = handler;
  }

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
      const videoName = videoPath.split("/").slice(-1).pop();

      this.updateVideoPath(videoPath);
      this.updateVideoName(videoName);
    });
  };

  handleSaveVideo = () => {
    ipcRenderer.send("SAVE_FILE");
    console.log("save file!");
  };

  /**
   * Sends the command to process the video
   * @param {*} evt
   */
  handleProcessVideo = (sketch) => {
    const {withBodyPix, withFaceApi, videoPath} = this.state;
    if(withFaceApi === false && withBodyPix === false){
      alert('At least one of the blocking options must be checked -- please try again!');
      return;
    } 

    ipcRenderer.send("PROCESS_VIDEO", videoPath);

    // TODO  add methods below
    ipcRenderer.on("FRAMES_READY", async (evt, arg) => {
      for (let i = 0; i < arg.totalFrames; i++) {
        let num = sketch.nf(i + 1, 3, 0);
        console.log(num);
        await sketch.processFrame(`frames/out${num}.jpg`, this.applyBlock);
      }
    });

  }

  applyBlock = async (canvasImg) => {
      const {withBodyPix, withFaceApi} = this.state;

      const results = {
        bodyPixSegmentation: null,
        faceApiFaces: null
      }

      if (withBodyPix) {
        const bodyPixOptions = {
          maxDetections: 100,
        }
        // BodyPix
        const segmentation = await this.bodyPix.segmentMultiPersonParts(
          canvasImg,
          bodyPixOptions
        );
        results.bodyPixSegmentation = segmentation;
      }

      if (withFaceApi) {
        // Face-API
        const faces = await this.faceApi.detectAllFaces(canvasImg);

        results.faceApiFaces = faces;
      }

      return results;
  }

  
}

module.exports = Model;
