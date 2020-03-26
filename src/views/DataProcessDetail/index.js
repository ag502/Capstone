import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
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
    marginTop: theme.spacing(4)
  }
}));

const DataProcessDetail = () => {
  const { videoInfo } = useParams();
  const [videoKeywords, setVideoKeywords] = useState([]);
  const [videoPerModel, setVideoPerModel] = useState({});
  const [videoID, startTime, endTime] = videoInfo.split('&');
  const classes = useStyles();

  useEffect(() => {
    axios
      .post('http://localhost:8000/preprocessor/', {
        videoID,
        startTime,
        endTime
      })
      .then(res => {
        console.log(res);
        setVideoPerModel(res.data);
        // setVideoKeywords([res.data[0].keyword]);
      });
  }, []);

  return (
    <Page className={classes.root}>
      <Container maxWidth={false}>
        <Header videoInfo={videoInfo} videoKeywords={videoKeywords} />
        <VideoPlayer
          mode="TRIMEDVIDEO"
          videoID={`${videoID}_${startTime}-${endTime}`}
        />
        <div className={classes.expanderContainer}>
          {Object.keys(videoPerModel).map(tag => (
            <ModelExpander modelTag={tag} videos={videoPerModel[tag]} />
          ))}
        </div>
      </Container>
    </Page>
  );
};

export default DataProcessDetail;
