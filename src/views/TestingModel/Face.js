import React, { useState, useEffect, useRef } from 'react';
// import * as faceapi from 'face-api.js';
import * as faceapi from 'face-api.js/dist/face-api.min.js';

// import * as faceapi from './face-api.min.js';
import { 
  CardContent, CardMedia,
  colors,
  Chip
} from '@material-ui/core';

const Face = ({ modelName, videoInfo }) => {
  const videoRef = useRef();
  let stop;
  async function loadModel(model) {
    try {
      if (model === "EmotionDetection") {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceExpressionNet.loadFromUri('/models');
      } else if (model === "FaceAPI") {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.ageGenderNet.loadFromUri('/models');
      }
    } catch (error) {
      console.log(error);
    }
  }

  function startVideo(model) {
    const video = videoRef.current;
    video.src = `https://aws-s3-capstone.s3.ap-northeast-2.amazonaws.com/${modelName}/${modelName}_${videoInfo[0]}_${videoInfo[1]}-${videoInfo[2]}_${videoInfo[3]}.mp4`;
    video.addEventListener('play', () => {
      const canvas = document.getElementById("overlay");
      const displaySize = { width: video.width, height: video.height }
      faceapi.matchDimensions(canvas, displaySize);
      stop = setInterval(async () => {
        let detections = null;
        if (model === "EmotionDetection") {
          detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        } else {
          detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withAgeAndGender();
          console.log("hi")
          const resizedDetections = faceapi.resizeResults(detections, displaySize)
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
          faceapi.draw.drawDetections(canvas, resizedDetections)
          resizedDetections.forEach( detection => {
            const box = detection.detection.box
            const drawBox = new faceapi.draw.DrawBox(box, { label: Math.round(detection.age) + " year old " + detection.gender })
            drawBox.draw(canvas)
          })
        }
        
      }, 1);
    });
  }

  useEffect(() => {
    loadModel(modelName);
  },[]);

  
  useEffect(() => {
    startVideo(modelName);
    return () => {
      clearInterval(stop)
    }
  },[videoInfo]);
  

  return (
    <CardMedia >
    <div style={{position:"relative", width:"100%", height:"350px"}}>
        <video
            id="video"
            ref={videoRef}
            width='100%'
            height='100%'
            controls
            crossOrigin='Anonymous'
            style={{position:"absolute"}}
            preload="auto"
          />
          <canvas
              id="overlay"
              style={{zIndex:1000, position:"absolute", width:"100%", height:"85%"}} />
      </div>
    </CardMedia>
  );
}


export default Face;