import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Page from 'src/components/Page';
import VideoPlayer from 'src/components/Video/VideoPlayer';
import Header from './Header';
import ModelExpander from './ModelExpander';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const DataProcessDetail = () => {
  const { videoInfo } = useParams();
  const [videoKeywords, setVideoKeywords] = useState([]);
  const [videoID, startTime, endTime] = videoInfo.split('&');
  const classes = useStyles();

  useEffect(() => {
    axios
      .post('http://localhost:8000/preprocessor/', {
        videoID,
        startTime,
        endTime
      })
      .then(res => setVideoKeywords([res.data[0].keyword]));
  }, []);

  return (
    <Page className={classes.root}>
      <Container maxWidth={false}>
        <Header videoInfo={videoInfo} videoKeywords={videoKeywords} />
        <VideoPlayer
          mode="TRIMEDVIDEO"
          videoID={`${videoID}_${startTime}-${endTime}`}
        />
        <ModelExpander />
      </Container>
    </Page>
  );
};

export default DataProcessDetail;
