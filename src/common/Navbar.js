const html = require('nanohtml');

require('./Navbar.scss');

const Navbar = () => {

  return html`
    <nav class="navbar">
      <ul class="navbar__list">
        <section class="navbar__list-section navbar__list-section--left">
          <li class="navbar__list-item">In solidarity with #BLM</li>
        </section>
        <section class="navbar__list-section navbar__list-section--right">
          Made with ❤ in Brooklyn
        </section>
      </ul>
    </nav>
  `
}

// “share the scene and not the rest 🙈”

module.exports = Navbar;