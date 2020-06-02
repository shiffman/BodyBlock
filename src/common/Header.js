const html = require('nanohtml');

require('./Header.scss');

const Header = () => {
  return html`
    <header class="header">
      <h1>BodyBlock</h1>
      <p>A tool to blur out peoples' faces in video</p>
    </header>
  `;
};

module.exports = Header;