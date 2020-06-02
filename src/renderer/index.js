// Initial welcome page. Delete the following line to remove it.
// 'use strict';const styles=document.createElement('style');styles.innerText=`@import url(https://unpkg.com/spectre.css/dist/spectre.min.css);.empty{display:flex;flex-direction:column;justify-content:center;height:100vh;position:relative}.footer{bottom:0;font-size:13px;left:50%;opacity:.9;position:absolute;transform:translateX(-50%);width:100%}`;const vueScript=document.createElement('script');vueScript.setAttribute('type','text/javascript'),vueScript.setAttribute('src','https://unpkg.com/vue'),vueScript.onload=init,document.head.appendChild(vueScript),document.head.appendChild(styles);function init(){Vue.config.devtools=false,Vue.config.productionTip=false,new Vue({data:{versions:{electron:process.versions.electron,electronWebpack:require('electron-webpack/package.json').version}},methods:{open(b){require('electron').shell.openExternal(b)}},template:`<div><div class=empty><p class="empty-title h5">Welcome to your new project!<p class=empty-subtitle>Get qwdqwd now and take advantage of the great documentation at hand.<div class=empty-action><button @click="open('https://webpack.electron.build')"class="btn btn-primary">Documentation</button> <button @click="open('https://electron.atom.io/docs/')"class="btn btn-primary">Electron</button><br><ul class=breadcrumb><li class=breadcrumb-item>electron-webpack v{{ versions.electronWebpack }}</li><li class=breadcrumb-item>electron v{{ versions.electron }}</li></ul></div><p class=footer>This intitial landing page can be easily removed from <code>src/renderer/index.js</code>.</p></div></div>`}).$mount('#app')}
const html = require("nanohtml");
const tf = require("@tensorflow/tfjs");
const bp = require("@tensorflow-models/body-pix");

const Navbar = require("common/Navbar");

require("./index.scss");

const App = () => {
  return html`
    <div class="home">
      <header class="header">
        <h1>BodyBlock</h1>
        <p>A tool to blur out people's faces in video</p>
      </header>
      <main class="main">
        <section class="main-section">
          <h2 class="main-section__title">Add your video</h2>
          <div class="main-section__content">
            <input type="file" id="file-upload" />
          </div>
        </section>
        <section class="main-section">
          <h2 class="main-section__title">Blur the faces</h2>
          <div class="main-section__content">
            <canvas
              id="main-canvas"
            ></canvas>
          </div>
        </section>
        <section class="main-section">
          <h2 class="main-section__title">Download video</h2>
          <div class="main-section__content">
            <button class="button button--save" id="save-button">Save 💾</button>
          </div>
        </section>
      </main>
      <footer class="footer">
        ${Navbar()}
      </footer>
    </div>
  `;
};

document.querySelector("#app").appendChild(App());
