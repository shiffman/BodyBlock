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
  const command1 = `${__dirname}/node_modules/ffmpeg-static/ffmpeg -i ${file} -qscale:v 2 frames/out%03d.jpg`;
  const response1 = await exec(command1);
  console.log(response1);

  // Apply obfuscation

  // repack frames (hide the file until repacking is done)
  const command2 = `${__dirname}/node_modules/ffmpeg-static/ffmpeg -y -start_number 0 -i 'frames/out%03d.jpg' .out.mp4`;
  const response2 = await exec(command2);

  // Make the file visible on Unix-based systems
  await exec(`mv .out.mp4 out.mp4`);
  console.log(response2);
}