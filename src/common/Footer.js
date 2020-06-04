const html = require('nanohtml');

require('./Footer.scss');

const Footer = () => {

  return html`
    <footer class="footer">
      <ul class="footer__list">
        <section class="footer__list-section footer__list-section--left">
          <li class="footer__list-item">In solidarity with #BLM</li>
        </section>
        <section class="footer__list-section footer__list-section--right">
          Made with &#x1F5A4 in Brooklyn
        </section>
      </ul>
    </footer>
  `
}

// “share the scene and not the rest &#x1f648;”

module.exports = Footer;
