import React from 'react';
require('./Footer.scss');

const Footer = () => {

  return (
    <footer className="footer">
      <ul className="footer__list">
        <section className="footer__list-section footer__list-section--left">
          <li className="footer__list-item">In solidarity with #BLM</li>
        </section>
        <section className="footer__list-section footer__list-section--right">
          Made with ❤ in Brooklyn
        </section>
      </ul>
    </footer>
  )
}

export default Footer;