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
          ${this.processVideoButton}
          ${this.selectVideoButton}
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

}

module.exports = View;
