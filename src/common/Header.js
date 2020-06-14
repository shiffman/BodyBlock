import React from 'react';

require('./Header.scss');

const Header = () => {
  return (
    <header className="header">
      <ul className="header__list">
        <li className="header__logo"><a>BodyBlock</a></li>
      </ul>
    </header>
  );
};

export default Header;