const ffmpeg = require("ffmpeg-static");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const fs = require("fs");

// const shellescape = require('any-shell-escape');
// processVideo('test/Crowd-6582.mp4');

async function unpackVideoToFrames(file, dir = "frames") {
  try {
    // Make the directory
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // unpack frames
    const command1 = `${__dirname}/../../node_modules/ffmpeg-static/ffmpeg -i ${file} -qscale:v 2 ${dir}/out%03d.jpg`;
    const response1 = await exec(command1);
    console.log(response1);
    return {
      path: `${dir}/out%3d.jpg`,
      // TODO RETURN TOTAL NUMBER OF FRAMES HERE
      totalFrames: 460
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function packVideoFromFrames(dir = "out-frames") {
  try {
    const command2 = `${__dirname}/../../node_modules/ffmpeg-static/ffmpeg -y -start_number 0 -i '${dir}/out%03d.jpg' .out.mp4`;
    const response2 = await exec(command2);
    await exec(`mv .out.mp4 out.mp4`);
    return {
      path: 'out.mp4'
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function processVideo(file) {
  await unpackVideoToFrames(file);

  // Apply obfuscation

  // repack frames
  return await packVideoFromFrames();
}

module.exports = {
  processVideo,
  unpackVideoToFrames,
  packVideoFromFrames
};