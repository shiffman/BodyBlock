const html = require('nanohtml');

const Navbar = () => {

  return html`
    <nav class="navbar">
      <ul>
        <li>Home</li>
        <li>About</li>
      </ul>
    </nav>
  `
}

module.exports = Navbar;