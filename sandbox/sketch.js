let net;
let status;
let frameCount = 0;

async function loadBodyPix() {
  status.html('loading bodypix...');
  net = await bodyPix.load();
  status.html('bodypix loaded');
  video.elt.addEventListener('seeked', segment);
  video.time(0);
}

async function segment() {
  // segmentation = await net.segmentPerson(video.elt);
  const segmentation = await net.segmentMultiPersonParts(video.elt);
  next = true;

  image(video, 0, 0);
  for (let i = 0; i < segmentation.length; i++) {
    let seg = segmentation[i];
    for (let x = 0; x < video.width; x += 10) {
      for (let y = 0; y < video.height; y += 10) {
        let index = x + y * video.width;
        // if (segmentation.data[index] == 0 || segmentation.data[index] == 1) {
        if (seg.data[index] == 0 || seg.data[index] == 1) {
          fill(255, 0, 255);
          rect(x, y, 10, 10);
        } else if (seg.data[index] > 1) {
          // } else if (segmentation.data[index] > 1) {
          fill(0, 255, 0);
          rect(x, y, 10, 10);
        }
      }
    }
  }
  let duration = video.duration();
  console.log(duration);
  let fps = 30;
  let totalFrames = fps * duration;
  status.html(`Processing frame ${frameCount} out of ${floor(totalFrames)}`);
  frameCount++;
  let t = (frameCount / totalFrames) * duration;
  video.time(t);
}


function setup() {
  video = createVideo('test/Crowd - 6582.mp4', loadBodyPix);
  canvas = createCanvas(640, 360);
  status = createP();
}