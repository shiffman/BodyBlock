import React, { useContext } from "react";
const { ipcRenderer } = require("electron");
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

  const handleSelectVideo = (evt) => {
      evt.preventDefault();
      // use the ipcRenderer object to pass messages to ipcMain
      // OPEN_FILE_UPLOAD will open up a dialog to select a file
      ipcRenderer.send("OPEN_FILE_UPLOAD");
      
      ipcRenderer.on("OPEN_FILE_UPLOAD", (evt, arg) => {
          console.log(arg);
          const videoPath = arg.filePaths[0];
          const videoName = videoPath.split("/").slice(-1).pop();
          setMenu({ ...menu, videoPath, videoName });
      });
  }


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
  <p className="section__description">Select a video: {menu.videoName !== null ? menu.videoName : "none selected yet" }</p>
        → <button onClick={handleSelectVideo}>Select Video</button>
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
