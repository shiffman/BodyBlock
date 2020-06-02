const html = require('nanohtml');

require('./Navbar.scss');

const Navbar = () => {

  return html`
    <nav class="navbar">
      <ul class="navbar__list">
        <section class="navbar__list-section navbar__list-section--left">
          <li class="navbar__list-item">BodyBlock</li>
        </section>
        <section class="navbar__list-section navbar__list-section--right">
          “share the scene and not the rest 🙈”
        </section>
      </ul>
    </nav>
  `
}

module.exports = Navbar;