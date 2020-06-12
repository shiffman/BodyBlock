const html = require("nanohtml");
const Footer = require("../common/Footer.js");
const Header = require("../common/Header.js");
require("./index.scss");

// const VideoOptionsMenu = () => {
//   return html`
//     <div>
//       <div>
//         <input
//           onchange=${this.toggleChecked("withFaceApi")}
//           type="checkbox"
//           name="with-faceapi"
//           value="true"
//           ${this.isChecked(this.withFaceApi)}
//         />
//         <label for="with-faceapi">Block face</label>
//       </div>
//       <div>
//         <input
//           onchange=${this.toggleChecked("withBodyPix")}
//           type="checkbox"
//           name="with-bodypix"
//           value="true"
//           ${this.isChecked(this.withBodyPix)}
//         />
//         <label for="with-bodypix">Block Body?</label>
//       </div>
//     </div>
//   `;
// };

const Main = () => {
  return html` <main class="main"></main> `;
};

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
        </main>
        ${this.Footer}
      </div>
    `;
  }

  updateChecked = (model, bool) => {
    console.log(bool)
    const checked =  bool === true ? "checked" :'';

    if(model === 'faceApi'){
      this.inputWithFaceApi.querySelector('input').setAttribute("checked", checked);
    }

    if(model === 'bodyPix'){
      this.inputWithBodyPix.querySelector('input').setAttribute("checked", checked);
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


}

module.exports = View;
