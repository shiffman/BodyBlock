const { ipcRenderer } = require("electron");
// const html = require("nanohtml");
const tf = require("@tensorflow/tfjs");
const bp = require("@tensorflow-models/body-pix");
const faceApi = require("face-api.js");

// const p5 = require("p5");
// const nativeImage = require("electron").nativeImage;


// const FACE_MODEL_URLS = {
//   Mobilenetv1Model:
//     "https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/ssd_mobilenetv1_model-weights_manifest.json",
//   TinyFaceDetectorModel:
//     "https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/tiny_face_detector_model-weights_manifest.json",
//   FaceLandmarkModel:
//     "https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/face_landmark_68_model-weights_manifest.json",
//   FaceLandmark68TinyNet:
//     "https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/face_landmark_68_tiny_model-weights_manifest.json",
//   FaceRecognitionModel:
//     "https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/face_recognition_model-weights_manifest.json",
// };

// // App components
// const Footer = require("common/Footer");
// const Header = require("common/Header");

// // Main style
// require("./index.scss");

// // Loading screen
// const loadingScreen = html`
//   <div id="loadingScreen" />
// `;
// document.querySelector("#app").append(loadingScreen);

// /**
//  * Main App Class
//  */
// class App {
//   constructor(bodyPix) {
//     this.videoPath = null;
//     this.bodyPix = bodyPix;
//     (this.withFaceApi = true),
//       (this.withBodyPix = true),
//       (this.status = "not started"); // 'not started', 'processing', 'done'
//   }

//   /**
//    * save file
//    * @param {Object} evt
//    */
//   saveFile(evt) {
//     ipcRenderer.send("SAVE_FILE");
//     console.log("save file!");
//   }

//   /**
//    * Callback function that handles the file upload
//    * @param {Object} evt
//    */
//   handleFileUpload(evt) {
//     evt.preventDefault();

//     // use the ipcRenderer object to pass messages to ipcMain
//     // OPEN_FILE_UPLOAD will open up a dialog to select a file
//     ipcRenderer.send("OPEN_FILE_UPLOAD");

//     // We listen for a response with the filePath
//     ipcRenderer.on("OPEN_FILE_UPLOAD", (evt, arg) => {
//       console.log(arg);
//       this.videoPath = arg.filePaths[0];
//       const filename = this.videoPath.split("/").slice(-1).pop();
//       document.querySelector("#selected-file-path").textContent = filename;
//     });
//   }

//   /**
//    * Sends the command to process the video
//    * @param {*} evt
//    */
//   processVideo(evt) {
//     if(this.withFaceApi === false && this.withBodyPix === false){
//       alert('At least one of the blocking options must be checked -- please try again!');
//       return;
//     } 

//     evt.preventDefault();
//     ipcRenderer.send("PROCESS_VIDEO", this.videoPath);
//     const sketch = this.createSketch();
//     ipcRenderer.on("FRAMES_READY", async (evt, arg) => {
//       for (let i = 0; i < arg.totalFrames; i++) {
//         let num = sketch.nf(i + 1, 3, 0);
//         console.log(num);
//         await sketch.processFrame(`frames/out${num}.jpg`);
//       }
//     });
//   }

//   /**
//    * p5 sketch for showing
//    * @param {*} p
//    */
//   sketch(p) {
//     const parentContainer = document.querySelector("#main-canvas-container");
//     const canvas = parentContainer.querySelector("#main-canvas");
//     const ctx = canvas.getContext("2d");

//     /**
//      * Setup
//      */
//     p.setup = () => {
//       // TODO: deal with canvas size (autodetect from video file)
//       p.canvas = p.createCanvas(640, 360);
//       p.canvas.id("hidden-canvas");
//       p.frameNum = 1;
//       p.resolution = 4;
//     };

//     /**
//      * promisifies p5.loadImage() function
//      */
//     p.loadImagePromise = (path) => {
//       return new Promise((resolve, reject) => {
//         // TODO: Need to account for error?
//         p.loadImage(path, (img) => {
//           resolve(img);
//         });
//       });
//     };

//     /**
//      * process the frame with segmentation
//      */
//     p.processFrame = async (frame) => {
//       const image = nativeImage.createFromPath(frame);
//       let img = await p.loadImagePromise(image.toDataURL());

//       p.resizeCanvas(img.width, img.height);

//       img.loadPixels();
//       p.image(img, 0, 0);

//       if (this.withBodyPix) {
//         // BodyPix
//         const segmentation = await this.bodyPix.segmentMultiPersonParts(
//           img.canvas,
//           {
//             maxDetections: 100,
//           }
//         );
//         for (let i = 0; i < segmentation.length; i++) {
//           let seg = segmentation[i];
//           for (let x = 0; x < img.width; x += p.resolution) {
//             for (let y = 0; y < img.height; y += p.resolution) {
//               let index = x + y * img.width;
//               if (seg.data[index] == 0 || seg.data[index] == 1) {
//                 p.colorMode(p.RGB);
//                 p.noStroke();
//                 p.fill(127);
//                 p.rect(x, y, p.resolution);
//               } else if (seg.data[index] > 1) {
//                 p.colorMode(p.HSB);
//                 const br = p.map(seg.data[index], 2, 23, 0, 360);
//                 p.fill(br, 100, 50);
//                 p.rect(x, y, p.resolution);
//               }
//             }
//           }
//         }
//       }

//       if (this.withFaceApi) {
//         // Face-API
//         const faces = await faceapi.detectAllFaces(img.canvas);
//         for (let i = 0; i < faces.length; i++) {
//           let face = faces[i];
//           p.fill(0);
//           p.noStroke();
//           p.rect(face.box.x, face.box.y, face.box.width, face.box.height);
//         }
//       }

      

//       // the output image
//       const msg = {
//         imgb64: p.canvas.elt.toDataURL(),
//         frameNum: p.nf(p.frameNum, 3, 0),
//       };

//       // change the canvas size to match the image size

//       canvas.width = img.width; // * (parentContainer.clientWidth / p.canvas.elt.width);
//       canvas.height = img.height; // * (parentContainer.clientHeight / p.canvas.elt.height);

//       // render to the preview canvas
//       var hRatio = parentContainer.clientWidth / p.canvas.elt.width;
//       var vRatio = parentContainer.clientHeight / p.canvas.elt.height;
//       var ratio = Math.min(hRatio, vRatio);
//       canvas.width = canvas.width * ratio;
//       canvas.height = canvas.height * ratio;
//       // ctx.drawImage(p.canvas.elt, 0,0, p.canvas.elt.width, p.canvas.elt.height, 0,0,p.canvas.elt.width*ratio, p.canvas.elt.height*ratio);
//       ctx.drawImage(
//         p.canvas.elt,
//         0,
//         0,
//         p.canvas.elt.width,
//         p.canvas.elt.height,
//         0,
//         0,
//         canvas.width,
//         canvas.height
//       );

//       // send the message to the main
//       ipcRenderer.send("NEW_FRAME", msg);
//       p.frameNum++;
//     };
//   }

//   /**
//    * Create the p5 sketch showing the frames being blurred
//    */
//   createSketch() {
//     const p5Sketch = new p5(this.sketch.bind(this), "hidden-canvas-container");
//     return p5Sketch;
//   }

//   isChecked(bool) {
//     return bool === true ? "checked" : "";
//   }

//   toggleChecked(key) {
//     return (evt) => {
//       this[key] = !this[key];
//     };
//   }

//   /**
//    * Render the elements to the DOM
//    */
//   render() {
//     const dom = html`
//       <div class="home">
//         ${Header()}
//         <main class="main">
//           <section class="main-section">
//             <h2 class="main-section__title">
//               1. Add your video -
//               <span id="selected-file-path">no file selected</span>
//             </h2>
//             <div class="main-section__content main-section__content--left">
//               <div>
//                 <input
//                   onchange=${this.toggleChecked("withFaceApi")}
//                   type="checkbox"
//                   name="with-faceapi"
//                   value="true"
//                   ${this.isChecked(this.withFaceApi)}
//                 />
//                 <label for="with-faceapi">Block face</label>
//               </div>
//               <div>
//                 <input
//                   onchange=${this.toggleChecked("withBodyPix")}
//                   type="checkbox"
//                   name="with-bodypix"
//                   value="true"
//                   ${this.isChecked(this.withBodyPix)}
//                 />
//                 <label for="with-bodypix">Block Body?</label>
//               </div>

//               <button
//                 onclick=${this.handleFileUpload.bind(this)}
//                 class="button"
//               >
//                 Select Video 📼
//               </button>
//               <button onclick=${this.processVideo.bind(this)} class="button">
//                 Process →
//               </button>
//             </div>
//           </section>
//           <section class="main-section">
//             <h2 class="main-section__title">2. Video Preview</h2>
//             <div class="main-section__content">
//               <div id="main-canvas-container">
//                 <canvas id="main-canvas"></canvas>
//               </div>
//               <!-- this is where the p5 canvas is being drawn -->
//               <div id="hidden-canvas-container"></div>
//             </div>
//           </section>
//           <section class="main-section">
//             <h2 class="main-section__title">3. Download video</h2>
//             <div class="main-section__content main-section__content--left">
//               <button
//                 onclick=${this.saveFile}
//                 class="button button--save"
//                 id="save-button"
//               >
//                 Save 💾
//               </button>
//             </div>
//           </section>
//         </main>
//         <!-- Bottom footer -->
//         ${Footer()}
//       </div>
//     `;
//     // Replace loading screen with App
//     document.querySelector("#app #loadingScreen").replaceWith(dom);
//   }
// }

// // main app
// window.addEventListener("DOMContentLoaded", async () => {
//   const bodyPix = await bp.load({
//     architecture: "ResNet50",
//     outputStride: 16,
//     quantBytes: 4,
//   });

//   // Load FaceAPI models
//   await faceapi.nets.ssdMobilenetv1.loadFromUri(
//     FACE_MODEL_URLS.Mobilenetv1Model
//   );
//   await faceapi.nets.tinyFaceDetector.loadFromUri(
//     FACE_MODEL_URLS.TinyFaceDetectorModel
//   );

//   faceapi.env.monkeyPatch({
//     Canvas: HTMLCanvasElement,
//     Image: HTMLImageElement,
//     ImageData: ImageData,
//     Video: HTMLVideoElement,
//     createCanvasElement: () => document.createElement("canvas"),
//     createImageElement: () => document.createElement("img"),
//   });

//   const app = new App(bodyPix);
//   app.render();
// });

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