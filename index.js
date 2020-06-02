const ffmpeg = require('ffmpeg-static');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');

// const shellescape = require('any-shell-escape');

processVideo('test/Crowd-6582.mp4');

async function processVideo(file) {
  // Make the directory
  if (!fs.existsSync('frames')) {
    fs.mkdirSync('frames');
  }

  // unpack frames
  const command1 = `ffmpeg -i ${file} -qscale:v 2 frames/out%03d.jpg`;
  const response1 = await exec(command1);
  console.log(response1);

  // Apply obfuscation

  // repack frames
  const command2 = `ffmpeg -y -start_number 0 -i 'frames/out%3d.jpg' out.mp4`;
  const response2 = await exec(command2);
  console.log(response2);
}