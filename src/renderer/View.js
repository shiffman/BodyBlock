const html = require("nanohtml");
const p5 = require("p5");
const nativeImage = require("electron").nativeImage;
const { ipcRenderer } = require("electron");
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
    this.p5sketch = null;

    this.previewCanvas = html` <canvas id="main-canvas"></canvas> `;

    this.previewCanvasContainer = html`
      <div id="main-canvas-container">${this.previewCanvas}</div>
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
          ${this.inputWithBodyPix} ${this.inputWithFaceApi}
          ${this.selectVideoButton} ${this.processVideoButton}
          ${this.videoProcessingStatus} ${this.videoFileName}
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

  bindProcessVideoHandler = (handler) => {
    this.processVideoButton.addEventListener("click", (evt) => {
      evt.preventDefault();

      const sketch = this.createSketch();
      handler(sketch);
    });
  };

  // ------ p5 sketch ------ //

  /**
   * create the sketch and return the p5 sketch instance
   */
  createSketch = () => {
    this.p5CanvasContainer.innerHTML = ""; // TODO - properly remove child elements!!!
    return new p5(this.sketch.bind(this), "hidden-canvas-container");
  };

  /**
   * The p5 sketch and accompanying functions
   */
  sketch = (p) => {
    const parentContainer = this.previewCanvasContainer;
    const canvas = this.previewCanvas;
    const ctx = canvas.getContext("2d");

    /**
     * Setup
     */
    p.setup = () => {
      // TODO: deal with canvas size (autodetect from video file)
      p.canvas = p.createCanvas(640, 360);
      p.canvas.id("hidden-canvas");
      p.frameNum = 1;
      p.resolution = 4;
    };

    /**
     * promisifies p5.loadImage() function
     */
    p.loadImagePromise = (path) => {
      return new Promise((resolve, reject) => {
        // TODO: Need to account for error?
        p.loadImage(path, (img) => {
          resolve(img);
        });
      });
    };

    p.renderBodyPix = (segmentation, img) => {
      for (let i = 0; i < segmentation.length; i++) {
        let seg = segmentation[i];
        for (let x = 0; x < img.width; x += p.resolution) {
          for (let y = 0; y < img.height; y += p.resolution) {
            let index = x + y * img.width;
            if (seg.data[index] == 0 || seg.data[index] == 1) {
              p.colorMode(p.RGB);
              p.noStroke();
              p.fill(127);
              p.rect(x, y, p.resolution);
            } else if (seg.data[index] > 1) {
              p.colorMode(p.HSB);
              const br = p.map(seg.data[index], 2, 23, 0, 360);
              p.fill(br, 100, 50);
              p.rect(x, y, p.resolution);
            }
          }
        }
      }
    };

    p.renderFaceApi = (faces) => {
      for (let i = 0; i < faces.length; i++) {
        let face = faces[i];
        p.fill(0);
        p.noStroke();
        p.rect(face.box.x, face.box.y, face.box.width, face.box.height);
      }
    };

    /**
     * process the frame with segmentation
     */
    p.processFrame = async (frame, applyBlock) => {
      const image = nativeImage.createFromPath(frame);
      let img = await p.loadImagePromise(image.toDataURL());

      p.resizeCanvas(img.width, img.height);

      img.loadPixels();
      p.image(img, 0, 0);

      const { bodyPixSegmentation, faceApiFaces } = await applyBlock(
        img.canvas
      );

      if (bodyPixSegmentation !== null) {
        p.renderBodyPix(bodyPixSegmentation, img);
      }

      if (faceApiFaces !== null) {
        p.renderFaceApi(faceApiFaces);
      }

      // the output image
      const msg = {
        imgb64: p.canvas.elt.toDataURL(),
        frameNum: p.nf(p.frameNum, 3, 0),
      };

      // change the canvas size to match the image size
      
      canvas.width = img.width; // * (parentContainer.clientWidth / p.canvas.elt.width);
      canvas.height = img.height; // * (parentContainer.clientHeight / p.canvas.elt.height);

      // render to the preview canvas
      var hRatio = parentContainer.clientWidth / p.canvas.elt.width;
      var vRatio = parentContainer.clientHeight / p.canvas.elt.height;
      var ratio = Math.min(hRatio, vRatio);
      canvas.width = canvas.width * ratio;
      canvas.height = canvas.height * ratio;
      // ctx.drawImage(p.canvas.elt, 0,0, p.canvas.elt.width, p.canvas.elt.height, 0,0,p.canvas.elt.width*ratio, p.canvas.elt.height*ratio);
      ctx.drawImage(
        p.canvas.elt,
        0,
        0,
        p.canvas.elt.width,
        p.canvas.elt.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      // send the message to the main
      ipcRenderer.send("NEW_FRAME", msg);
      p.frameNum++;
    };
  };
}

module.exports = View;
