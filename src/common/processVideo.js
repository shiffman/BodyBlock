const ffmpeg = require("ffmpeg-static");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const fs = require("fs");

// const shellescape = require('any-shell-escape');
// processVideo('test/Crowd-6582.mp4');

async function unpackVideoToFrames(file, dir="frames") {
  try {
    // Make the directory
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // unpack frames
    const command1 = `${__dirname}/../../node_modules/ffmpeg-static/ffmpeg -i ${file} -qscale:v 2 ${dir}/out%03d.jpg`;
    const response1 = await exec(command1);
    console.log(response1);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function packVideoFromFrames(dir="frames") {
  try {
    const command2 = `${__dirname}/../../node_modules/ffmpeg-static/ffmpeg -y -start_number 0 -i '${dir}/out%3d.jpg' out.mp4`;
    const response2 = await exec(command2);
    console.log(response2);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function processVideo(file) {
  await unpackVideoToFrames(file);

  // Apply obfuscation

  // repack frames
  await packVideoFromFrames()
}

module.exports = {
  processVideo,
  unpackVideoToFrames,
  packVideoFromFrames
};
