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
    width: '80%',
    margin: '25px auto 0px auto'
  }
}));

const DataProcessDetail = () => {
  const { videoInfo } = useParams();
  const [videoKeywords, setVideoKeywords] = useState([]);
  const [playVideoName, setPlayVideoName] = useState([]);
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
        console.log(res.data);
        setVideoPerModel(res.data);
      });
  }, []);

  return (
    <Page className={classes.root}>
      <Container maxWidth={false}>
        <Header videoInfo={videoInfo} videoKeywords={videoPerModel.keyword} />
        <VideoPlayer
          mode="TEST"
          // videoID={`${playVideoName[0]}/${playVideoName[1]}.mp4`}
          videoID={`${playVideoName[1]}`}
        />
        <div className={classes.expanderContainer}>
          {Object.keys(videoPerModel)
            .slice(1)
            .map(tag => (
              <ModelExpander
                key={tag}
                modelTag={tag}
                videos={videoPerModel[tag]}
                setPlayVideoName={setPlayVideoName}
              />
            ))}
        </div>
      </Container>
    </Page>
  );
};

export default DataProcessDetail;
