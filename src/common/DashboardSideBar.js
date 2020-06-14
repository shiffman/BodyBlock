import React, { useContext } from "react";

import { MenuContext } from "./Context";

import "./DashboardSideBar.scss";

const DashboardSidebar = () => {
  const { menu, setMenu } = useContext(MenuContext);

  const handleChange = (model) => {
    return (evt) => {
      console.log(model);
      setMenu({ ...menu, [model]: !menu[model] });
    };
  };

  const setChecked = (bool) => {
    return bool === true ? "checked" : "";
  };

  // TODO: make a nice menu bar
  return (
    <div className="DashboardSideBar">
      <section className="section">
        <p className="section__description">Select Auto-Blocking Methods</p>
        <div className="checkbox-row">
          <input
            type="checkbox"
            onChange={handleChange("withBodyPix")}
            checked={setChecked(menu.withBodyPix)}
          />
          <label>Block Face + Body - {String(menu.withBodyPix)}</label>
        </div>
        <div className="checkbox-row">
          
          <input
            type="checkbox"
            onChange={handleChange("withFaceApi")}
            checked={setChecked(menu.withFaceApi)}
          />
          <label>Block Face Only - {String(menu.withFaceApi)}</label>
        </div>
      </section>
      <section className="section">
        <p className="section__description">Select a video: none selected yet</p>
        → <button>Select Video</button>
      </section>
      <section className="section">
        <p className="section__description">Process the video: this may take a while</p>
        → <button>Process Video</button>
      </section>
      <section className="section">
        <p className="section__description">Output the video</p>
        → <button>Save Video</button>
      </section>
    </div>
  );
};

export default DashboardSidebar;
