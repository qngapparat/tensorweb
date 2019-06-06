const mobilenet = require("@tensorflow-models/mobilenet")

async function setupWebcam() {
  return new Promise((resolve, reject) => {
    console.log("requesting webcam access")
    const navigatorAny = navigator;
    navigator.getUserMedia = navigator.getUserMedia ||
        navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
        navigatorAny.msGetUserMedia;
    debugger
    if (navigator.getUserMedia) {
      navigator.getUserMedia({video: true},
        stream => {
          webcamElement.srcObject = stream;
          webcamElement.addEventListener('loadeddata',  () => resolve(), false);
        },
        error => { console.log("failed to get stream"); reject() });
    } else {
      reject();
    }
  });
}


setupWebcam()
  .catch(err => console.log("Failed to get str, err:", err))