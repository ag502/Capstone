import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Page from 'src/components/Page';
import VideoPlayer from 'src/components/Video/VideoPlayer';
import Header from './Header';
import ModelExpander from './Expander/ModelExpander';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  expanderContainer: {
    width: '410px'
    // margin: '0 auto 0 auto'
  }
}));

const DataProcessDetail = () => {
  const { videoInfo } = useParams();
  const [playVideoName, setPlayVideoName] = useState([]);
  const [videoPerModel, setVideoPerModel] = useState({});
  const [videoID, startTime, endTime] = videoInfo.split('&');
  const classes = useStyles();

  // 추가
  const videoInfosArr = videoInfo.split('+');

  useEffect(() => {
    axios
      .post('http://localhost:8000/preprocessor/', {
        // videoID,
        // startTime,
        // endTime
        videoInfo: videoInfosArr
      })
      .then(res => {
        console.log(res.data);
        setVideoPerModel(res.data);
      });
  }, []);

  return (
    <Page className={classes.root}>
      <Container maxWidth={false}>
        <Grid container alignContent="space-around" wrap="nowrap">
          <Grid container>
            <Grid item>
              <VideoPlayer
                mode="TEST"
                // videoID={`${playVideoName[0]}/${playVideoName[1]}.mp4`}
                videoID={`${playVideoName[0]}_${playVideoName[1]}`}
              />
            </Grid>
            <Grid item>
              <div>{playVideoName[2]}</div>
            </Grid>
          </Grid>
          <Grid container direction="column" alignContent="center">
            <Grid item>Hello</Grid>
            <Grid item>
              <div className={classes.expanderContainer}>
                {videoPerModel.model &&
                  Object.keys(videoPerModel.model).map(tag => (
                    <ModelExpander
                      key={tag}
                      modelTag={tag}
                      videos={videoPerModel.model[tag]}
                      setPlayVideoName={setPlayVideoName}
                    />
                  ))}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default DataProcessDetail;
