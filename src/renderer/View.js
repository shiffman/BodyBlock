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
        <input type="checkbox" name="with-bodypix"/>
        <label for="with-bodypix">Block Body</label>
      </div>
    `;
    this.inputWithFaceApi = html`
      <div>
        <input type="checkbox" name="with-faceapi" />
        <label for="with-faceapi">Block face</label>
      </div>
    `;

    this.selectVideoButton = html`
      <button>Select Video</button>
    `;

    this.processVideoButton = html`
      <button>Process Video</button>
    `;

    this.videoFileName = html`
      <p></p>
    `;

    this.saveVideoButton = html`
    <button id="save-button"> Save 💾</button>
    `


    // initialize
    this.init();
  }

  init = () => {
    const dom = this.render();
    document.querySelector("#app").appendChild(dom);
  }

  render = () => {
    return html`
      <div>
        ${this.Header}
        <main class="main">
          ${this.inputWithBodyPix}
          ${this.inputWithFaceApi}
          ${this.selectVideoButton}
          ${this.processVideoButton}
          ${this.videoFileName}
          ${this.saveVideoButton}
        </main>
        ${this.Footer}
      </div>
    `;
  }

  updateChecked = (model, bool) => {
    const checkedOr =  bool === true ? "checked" :'';

    if(model === 'faceApi'){
      this.inputWithFaceApi.querySelector('input').setAttribute("checked", checkedOr);
    }

    if(model === 'bodyPix'){
      this.inputWithBodyPix.querySelector('input').setAttribute("checked", checkedOr);
    }

  }

  bindToggleWithBodyPix = (handler) => {
    this.inputWithBodyPix.addEventListener("change", (evt) => {
      evt.preventDefault();
      handler();
    });
  }
  bindToggleWithFaceApi = (handler) => {
    this.inputWithFaceApi.addEventListener("change", (evt) => {
      evt.preventDefault();
      handler();
    });
  }

  bindSelectVideoHandler = (handler) => {
    this.selectVideoButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      handler();
    })
  }

  bindSaveVideoHandler = (handler) => {
    this.saveVideoButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      handler();
    })
  }

  updateVideoFileName = (name) => {
    this.videoFileName.textContent = name;
  }

}

module.exports = View;
