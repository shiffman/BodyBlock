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
      <h2>options</h2>
      <section>
        <div>
          <label>Block Face + Body - {String(menu.withBodyPix)}</label>
          <input
            type="checkbox"
            onChange={handleChange("withBodyPix")}
            checked={setChecked(menu.withBodyPix)}
          />
        </div>
        <div>
          <label>Block Face Only - {String(menu.withFaceApi)}</label>
          <input
            type="checkbox"
            onChange={handleChange("withFaceApi")}
            checked={setChecked(menu.withFaceApi)}
          />
        </div>
      </section>
      <section>
        <p>Select a video: none selected yet</p>
        <button>Select Video</button>
      </section>
      <section>
        <p>Process the video: this may take a while</p>
        <button>Process Video</button>
      </section>
      <section>
        <p>Output the video</p>
        <button>Save Video</button>
      </section>
    </div>
  );
};

export default DashboardSidebar;
