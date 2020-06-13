import React from 'react';

require('./Header.scss');

const Header = () => {
  return (
    <header className="header">
      <h1>BodyBlock</h1>
      <p>A tool to blur out peoples' faces in video</p>
    </header>
  );
};

export default Header;