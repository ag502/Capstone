import React, { useState, useEffect, useRef} from 'react';
import * as faceapi from 'face-api.js/dist/face-api.min.js';
// import * as faceapi from 'face-api.min.js'
import Page from 'src/components/Page';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { 
  Container,
  Tabs,
  Tab,
  Divider,
  Card, CardContent, CardMedia,
  Grid, GridList, GridListTile, GridListTileBar,
  colors,
  Typography,
  Chip
} from '@material-ui/core';
import axios from 'axios';
import Header from './Header';


const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  tabs: {
    marginTop: theme.spacing(3),
  },
  divider: {
    backgroundColor: colors.grey[300],
  },
  container: {
    maxWidth:"lg"
  },
  modelContainer: {
    paddingBottom: theme.spacing(3),
    maxWidth:"lg",
    maxHeight: '428px',
    margin: '0 0 0 0'
  },
}));

function TestingModel() {
  const classes = useStyles();
  const [value, setValue] = useState(-1);
  const videoRef = useRef(null);
  const constraints = { video: true }
  // let time = null
  let expressionTime;
  let ageTime;
  async function loadModel() {
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
      await faceapi.nets.ageGenderNet.loadFromUri('/models')
      console.log("finish")
    } catch (error) {
      console.log(error);
    }
  }

  function emotionVideo() {
    const video = videoRef.current;
        const canvas = document.getElementById("overlay")
        const displaySize = { width: video.width, height: video.height }
        faceapi.matchDimensions(canvas, displaySize)
        expressionTime = setInterval(async () => {
          const expressionDetections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
          const expressionResizedDetections = faceapi.resizeResults(expressionDetections, displaySize)
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
          faceapi.draw.drawDetections(canvas, expressionResizedDetections)
          faceapi.draw.drawFaceExpressions(canvas, expressionResizedDetections)
        }, 100);
      }

  function ageVideo() {
    const video = videoRef.current;
      const canvas = document.getElementById("overlay")
      const displaySize = { width: video.width, height: video.height }
      faceapi.matchDimensions(canvas, displaySize)
      ageTime = setInterval(async () => {
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withAgeAndGender();
          const resizedDetections = faceapi.resizeResults(detections, displaySize)
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
          faceapi.draw.drawDetections(canvas, resizedDetections)
          resizedDetections.forEach( detection => {
            const box = detection.detection.box
            const drawBox = new faceapi.draw.DrawBox(box, { label: Math.round(detection.age) + " year old " + detection.gender })
            drawBox.draw(canvas)
          })
        }, 100);
      }

  function vidOff() {

      let stream = videoRef.current.srcObject;
      let tracks = stream.getTracks();

      tracks.forEach(function (track) {
          track.stop();
      });

      videoRef.current.srcObject =null;
  }

  function handleChange(event, newValue) {
    clearInterval(expressionTime)
    clearInterval(ageTime)
    setValue(newValue);
  }
  useEffect(() => {
    loadModel();
  }, [])
  
  useEffect(() => {
     const video = videoRef.current;
    navigator.mediaDevices.getUserMedia(constraints).then(
    (stream) => { video.srcObject = stream })
    return () => {
      if (video) {
        vidOff()
      }
      if (value === 0) {
      clearInterval(expressionTime)
    } else if(value === 1) {
      clearInterval(ageTime)
    }
    }
  }, [value]);

  return (
    <Page
      className={classes.root}
      title="RealTime"
    >
      <Container className={classes.container}>
        <Header />
      </Container>
      <Grid
        container
        item
        direction="row"
        justify="space-between"
      >
        <Container className={classes.modelContainer}>
          <Tabs className={classes.tabs} value={value} onChange={handleChange}>
            <Tab
              label="emotion recognition"
            />
            <Tab
              label="age & gender"
            />
          </Tabs>
          <Divider className={classes.divider} />
        </Container>
        <Container
          width="100vw"
          height="100vh"
          align-items="center"
          justify-content="center"
          display="flex"
        >
          <div id="cont" style={{position:"relative"}}>
            <video 
              id="video"
              ref={videoRef}
              width="500"
              height="500"
              autoPlay={true}
              muted
              style={{position:"absolute", left : "30%"}}
              onPlay={value === 0 ? emotionVideo : value === 1 ? ageVideo : null}
              >
            </video>
            <canvas
              id="overlay"
              style={{zIndex:1000, position:"absolute", left : "30%"}} />
          </div>
          {/* <video onplay="onPlay(this)" id="inputVideo" autoPlay muted></video> */}
          {/* <canvas id="overlay" /> */}
        </Container>
      </Grid>
    </Page>
  );
}

export default TestingModel;
