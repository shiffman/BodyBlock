
import React, {useContext} from 'react';

import {MenuContext} from './Context';

const MenuBar = () => {
  const { menu, setMenu } = useContext(MenuContext);

  const handleChange = (model) => {
    return evt => {
      console.log(model);
      setMenu({...menu, [model]: !menu[model]});
    }
  }

  const setChecked = (bool) => {
    return bool === true ? "checked" : ""
  }

  return (
    <menu>
      <h2>options</h2>
      <div>
        <label>Block Face + Body - {String(menu.withBodyPix)}</label>
        <input type="checkbox" onChange={handleChange('withBodyPix')} checked={setChecked(menu.withBodyPix)}/>
      </div>
      <div>
        <label>Block Face Only - {String(menu.withFaceApi)}</label>
        <input type="checkbox" onChange={handleChange('withFaceApi')} checked={setChecked(menu.withFaceApi)}/>
      </div>
    </menu>
  )

}


export default MenuBar;