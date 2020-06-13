const html = require("nanohtml");
const Footer = require("../common/Footer.js");
const Header = require("../common/Header.js");
require("./index.scss");

class View {
  constructor() {
    this.app = document.querySelector("#app");

    this.Footer = Footer();
    this.Header = Header();

    this.inputWithBodyPix = html`
      <div>
        <input type="checkbox" name="with-bodypix" />
        <label for="with-bodypix">Add Body + Face Block</label>
      </div>
    `;
    this.inputWithFaceApi = html`
      <div>
        <input type="checkbox" name="with-faceapi" />
        <label for="with-faceapi">Add Additional Face Block</label>
      </div>
    `;

    this.selectVideoButton = html` <button>Select Video</button> `;

    this.processVideoButton = html` <button>Process Video</button> `;

    this.videoFileName = html` <p></p> `;

    this.saveVideoButton = html` <button id="save-button">Save 💾</button> `;

    this.videoProcessingStatus = html` <p></p> `;

    this.p5CanvasContainer = html` <div id="hidden-canvas-container"></div> `;

    this.previewCanvas = html` <canvas id="main-canvas"></canvas> `;

    this.previewCanvasContainer = html`
      <div id="main-canvas-container"> ${this.previewCanvas}</div>
    `;



    // initialize
    this.init();
  }

  init = () => {
    const dom = this.render();
    document.querySelector("#app").appendChild(dom);
  };

  render = () => {
    return html`
      <div>
        ${this.Header}
        <main class="main">
          ${this.inputWithBodyPix} 
          ${this.inputWithFaceApi}
          ${this.selectVideoButton} 
          ${this.processVideoButton}
          ${this.videoProcessingStatus} 
          ${this.videoFileName}
          ${this.previewCanvasContainer}
          ${this.saveVideoButton}

          
          ${this.p5CanvasContainer}
        </main>
        ${this.Footer}
      </div>
    `;
  };

  updateChecked = (model, bool) => {
    const checkedOr = bool === true ? "checked" : "";

    if (model === "faceApi") {
      this.inputWithFaceApi
        .querySelector("input")
        .setAttribute("checked", checkedOr);
    }

    if (model === "bodyPix") {
      this.inputWithBodyPix
        .querySelector("input")
        .setAttribute("checked", checkedOr);
    }
  };

  bindToggleWithBodyPix = (handler) => {
    this.inputWithBodyPix.addEventListener("change", (evt) => {
      evt.preventDefault();
      handler();
    });
  };
  bindToggleWithFaceApi = (handler) => {
    this.inputWithFaceApi.addEventListener("change", (evt) => {
      evt.preventDefault();
      handler();
    });
  };

  bindSelectVideoHandler = (handler) => {
    this.selectVideoButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      handler();
    });
  };

  bindSaveVideoHandler = (handler) => {
    this.saveVideoButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      handler();
    });
  };

  updateVideoFileName = (name) => {
    this.videoFileName.textContent = name;
  };

  updateVideoProcessingStatus = (status) => {
    this.videoProcessingStatus.textContent = status;
  };
}

module.exports = View;
