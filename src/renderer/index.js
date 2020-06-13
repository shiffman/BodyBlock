const { ipcRenderer } = require("electron");
const tf = require("@tensorflow/tfjs");
const bp = require("@tensorflow-models/body-pix");
const faceApi = require("face-api.js");

const Model = require('./Model');
const View = require('./View');
const Controller = require('./Controller');

let myApp;
window.addEventListener("DOMContentLoaded", async () => {
  
  const bodyPix = await bp.load({
    architecture: "ResNet50",
    outputStride: 16,
    quantBytes: 4,
  });

    const FACE_MODEL_URLS = {
    Mobilenetv1Model:
      "https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/ssd_mobilenetv1_model-weights_manifest.json",
    TinyFaceDetectorModel:
      "https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/tiny_face_detector_model-weights_manifest.json",
    FaceLandmarkModel:
      "https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/face_landmark_68_model-weights_manifest.json",
    FaceLandmark68TinyNet:
      "https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/face_landmark_68_tiny_model-weights_manifest.json",
    FaceRecognitionModel:
      "https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/face_recognition_model-weights_manifest.json",
  };

    // Load FaceAPI models
  await faceApi.nets.ssdMobilenetv1.loadFromUri(
    FACE_MODEL_URLS.Mobilenetv1Model
  );
  await faceApi.nets.tinyFaceDetector.loadFromUri(
    FACE_MODEL_URLS.TinyFaceDetectorModel
  );

  faceApi.env.monkeyPatch({
    Canvas: HTMLCanvasElement,
    Image: HTMLImageElement,
    ImageData: ImageData,
    Video: HTMLVideoElement,
    createCanvasElement: () => document.createElement("canvas"),
    createImageElement: () => document.createElement("img"),
  });

  const modelOptions = {
    bodyPix,
    faceApi
  }

  myApp = new Controller(new Model(modelOptions), new View());

  console.log(myApp);
});