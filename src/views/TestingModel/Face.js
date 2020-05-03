import React, { useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';
// import * as faceapi from './face-api.min';
import { 
  CardContent, CardMedia,
  colors,
  Chip
} from '@material-ui/core';

// export async function loadModels() {
//   const MODEL_URL = process.env.PUBLIC_URL + "/models";
//   const ageNet = new faceapi.AgeGenderNet();
//   const tinyNet = new faceapi.TinyFaceDetector();
//   // const tinyYoloNet = new faceapi.TinyYolov2();
//   const ssdNet = new faceapi.SsdMobilenetv1();
//   const landmark = new faceapi.FaceLandmark68Net();
//   ageNet.crossOrigin = "anonymous";
//   tinyNet.crossOrigin = "anonymous";
//   // tinyYoloNet.crossOrigin = "anonymous";
//   ssdNet.crossOrigin = "anonymous";
//   landmark.crossOrigin = "anonymous";
//   await ageNet.loadFromUri(MODEL_URL);
//   await tinyNet.loadFromUri(MODEL_URL);
//   // await tinyYoloNet.loadFromUri('/models');
//   await ssdNet.loadFromUri(MODEL_URL);
//   await landmark.loadFromUri(MODEL_URL);
//   // const e=await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
//   // await faceapi.loadAgeGenderModel(MODEL_URL);
//   // await faceapi.loadFaceDetectionModel(MODEL_URL);
// }

const Face = ({ modelName, videoInfo }) => {
  const video = document.getElementById('video');
  const MODEL_URL = process.env.PUBLIC_URL + "/models";
  const ageNet = new faceapi.AgeGenderNet();
  const tinyNet = new faceapi.TinyFaceDetector();
  const ssdNet = new faceapi.SsdMobilenetv1();
  const landmark = new faceapi.FaceLandmark68Net();
  ageNet.crossOrigin = "anonymous";
  tinyNet.crossOrigin = "anonymous";
  ssdNet.crossOrigin = "anonymous";
  landmark.crossOrigin = "anonymous";

  Promise.all([
  ageNet.loadFromUri(MODEL_URL + "/age_gender_model-shard1"),
  tinyNet.loadFromUri(MODEL_URL + "/tiny_face_detector_model-shard1"),
  ssdNet.loadFromUri(MODEL_URL + "/ssd_mobilenetv1_model-shard1"),
  landmark.loadFromUri(MODEL_URL + "/face_landmark_68_tiny_model-shard1")
]).then(startVideo(video))

  // useEffect(() => {
  //   loadModels();
  // });
  async function startVideo(v) {
    if (v) {
    v.addEventListener('play', () => {
      setInterval(async () => {
      const detections = await faceapi.detectAllFaces(v, new faceapi.TinyFaceDetectorOptions());
      console.log(detections);
  }, 100);
    });
  }
  }

  // if (video) {
  //   video.addEventListener('play', () => {
  //     // const canvas = faceapi.createCanvasFromMedia(video);
  //     // document.body.append(canvas);
  //     // const displaySize = { width: video.width, height: video.height };
  //     // faceapi.matchDimensions(canvas, displaySize);
  //     setInterval(async () => {
  //     const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withAgeAndGender();
  //     // const resizedDetections = faceapi.resizeResults(detections, displaySize);
  //     // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  //     // faceapi.draw.drawDetections(canvas, resizedDetections);
  //     console.log(detections);
  // }, 100);
  //   });
  // }

  return (
    <CardMedia>
      {<video
        id="video"
        src={`https://aws-s3-capstone.s3.ap-northeast-2.amazonaws.com/${modelName}/${modelName}_${videoInfo[0]}_${videoInfo[1]}-${videoInfo[2]}_${videoInfo[3]}.mp4`}
        width='100%'
        height='100%'
        controls
      />}
    </CardMedia>
  );
}



export default Face;