const ffmpeg = require('ffmpeg-static');
console.log(ffmpeg);
const util = require('util');
const exec = util.promisify(require('child_process').exec);
// const shellescape = require('any-shell-escape');

writeFrames('test/Crowd-6582.mp4');

async function writeFrames(file) {
  const command = `ffmpeg -i ${file} frames/out-%03d.jpg`;
  const response = await exec(command);
  console.log(response);
}