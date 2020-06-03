// Initial welcome page. Delete the following line to remove it.
// 'use strict';const styles=document.createElement('style');styles.innerText=`@import url(https://unpkg.com/spectre.css/dist/spectre.min.css);.empty{display:flex;flex-direction:column;justify-content:center;height:100vh;position:relative}.footer{bottom:0;font-size:13px;left:50%;opacity:.9;position:absolute;transform:translateX(-50%);width:100%}`;const vueScript=document.createElement('script');vueScript.setAttribute('type','text/javascript'),vueScript.setAttribute('src','https://unpkg.com/vue'),vueScript.onload=init,document.head.appendChild(vueScript),document.head.appendChild(styles);function init(){Vue.config.devtools=false,Vue.config.productionTip=false,new Vue({data:{versions:{electron:process.versions.electron,electronWebpack:require('electron-webpack/package.json').version}},methods:{open(b){require('electron').shell.openExternal(b)}},template:`<div><div class=empty><p class="empty-title h5">Welcome to your new project!<p class=empty-subtitle>Get qwdqwd now and take advantage of the great documentation at hand.<div class=empty-action><button @click="open('https://webpack.electron.build')"class="btn btn-primary">Documentation</button> <button @click="open('https://electron.atom.io/docs/')"class="btn btn-primary">Electron</button><br><ul class=breadcrumb><li class=breadcrumb-item>electron-webpack v{{ versions.electronWebpack }}</li><li class=breadcrumb-item>electron v{{ versions.electron }}</li></ul></div><p class=footer>This intitial landing page can be easily removed from <code>src/renderer/index.js</code>.</p></div></div>`}).$mount('#app')}

const {
  ipcRenderer
} = require("electron");
const html = require("nanohtml");
const tf = require("@tensorflow/tfjs");
const bp = require("@tensorflow-models/body-pix");
const p5 = require("p5");

// App components
const Footer = require("common/Footer");
const Header = require("common/Header");

// Main style
require("./index.scss");


/**
 * Main App Class
 */
class App {
  constructor(bodyPix) {
    this.videoPath = null;
    this.bodyPix = bodyPix;
    this.status = "not started"; // 'not started', 'processing', 'done'
  }

  /**
   * save file
   * @param {Object} evt
   */
  saveFile(evt) {
    console.log("save file!");
  }

  /**
   * Callback function that handles the file upload
   * @param {Object} evt
   */
  handleFileUpload(evt) {
    evt.preventDefault();

    // use the ipcRenderer object to pass messages to ipcMain
    // OPEN_FILE_UPLOAD will open up a dialog to select a file
    ipcRenderer.send("OPEN_FILE_UPLOAD");

    // We listen for a response with the filePath
    ipcRenderer.on("OPEN_FILE_UPLOAD", (evt, arg) => {
      console.log(arg);
      this.videoPath = arg.filePaths[0];
      const filename = this.videoPath.split("/").slice(-1).pop();
      document.querySelector("#selected-file-path").textContent = filename;
    });
  }

  /**
   * Sends the command to process the video
   * @param {*} evt 
   */
  processVideo(evt) {
    evt.preventDefault();
    ipcRenderer.send("PROCESS_VIDEO", this.videoPath);
    const sketch = this.createSketch();
    ipcRenderer.on("FRAMES_READY", (evt, arg) => {
      sketch.createImg(`data:image/jpg;base64,${arg}`, img => {
        sketch.image(img, 0, 0);
      });
    })
  }

  /**
   * p5 sketch for showing
   * @param {*} p
   */
  sketch(p) {
    let video;

    p.setup = () => {
      const parentContainer = document.querySelector("#main-canvas-container");
      const w = parentContainer.clientWidth;
      const h = parentContainer.clientHeight;
      p.createCanvas(w, h);
    };
  }

  /**
   * Create the p5 sketch showing the frames being blurred
   */
  createSketch() {
    const p5Sketch = new p5(this.sketch.bind(this), "main-canvas-container");
    return p5Sketch;
  }

  /**
   * Render the elements to the DOM
   */
  render() {
    const dom = html `
      <div class="home">
        ${Header()}
        <main class="main">
          <section class="main-section">
            <h2 class="main-section__title">Add your video</h2>
            <div class="main-section__content">
              <button
                onclick=${this.handleFileUpload.bind(this)}
                class="button"
              >
                Select Video 📼
              </button>
              <p id="selected-file-path">no file selected</p>
              <button onclick=${this.processVideo.bind(this)} class="button">
                Process →
              </button>
            </div>
          </section>
          <section class="main-section">
            <h2 class="main-section__title">Blur the faces</h2>
            <div class="main-section__content">
              <div id="main-canvas-container"></div>
            </div>
          </section>
          <section class="main-section">
            <h2 class="main-section__title">Download video</h2>
            <div class="main-section__content">
              <p>status: <span>${this.status}</span></p>
              <button
                onclick=${this.saveFile}
                class="button button--save"
                id="save-button"
              >
                Save 💾
              </button>
            </div>
          </section>
        </main>
        <!-- Bottom footer -->
        ${Footer()}
      </div>
    `;
    // add the DOM node to the #app
    document.querySelector("#app").append(dom);
  }
}

// main app
window.addEventListener("DOMContentLoaded", async () => {
  const bodyPix = await bp.load({
    architecture: "MobileNetV1",
    outputStride: 16,
    multiplier: 0.75,
    quantBytes: 2,
  });

  const app = new App(bodyPix);
  app.render();
});