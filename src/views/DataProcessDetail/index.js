import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Grid, Typography, Divider, Chip } from '@material-ui/core';
import { indigo, pink } from '@material-ui/core/colors';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Page from 'src/components/Page';
import VideoPlayer from 'src/components/Video/VideoPlayer';
import ModelExpander from './ModelExpander';

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
  const [playVideoInfo, setPlayVideoInfo] = useState([]);
  const [isPIP, setIsPIP] = useState(false);
  const [videoPerModel, setVideoPerModel] = useState({});
  const videoInfosArr = videoInfo.split('+');
  const classes = useStyles();

  // 추가

  const scrollEventHandler = () => {
    if (
      Math.ceil(
        (document.documentElement.scrollTop / window.innerHeight) * 100
      ) >= 60
    ) {
      setIsPIP(true);
    } else {
      setIsPIP(false);
    }
  };

  useEffect(() => {
    axios
      .post('http://localhost:8000/preprocessor/', {
        videoInfo: videoInfosArr
      })
      .then(res => {
        console.log(res.data);
        setVideoPerModel(res.data);
      });
    window.addEventListener('scroll', scrollEventHandler);
    return () => window.removeEventListener('scroll', scrollEventHandler);
  }, []);

  const finalSaveHandler = (modelTag, selectedVideo) => {
    const newModelPerVideo = videoPerModel.model[modelTag].filter(
      ({ model_tag, videoId, video_number, startTime, endTime }) =>
        !selectedVideo.includes(
          `${model_tag},${videoId},${startTime},${endTime},${video_number}`
        )
    );

    setVideoPerModel(prevState => ({
      model: { ...prevState.model, [modelTag]: [...newModelPerVideo] }
    }));
  };

  return (
    <Page className={classes.root}>
      <Container maxWidth={false}>
        <Grid container alignContent="space-around" wrap="nowrap">
          <Grid container direction="column" spacing={2}>
            <div>
              <Grid item>
                <VideoPlayer
                  mode="TEST"
                  isPIP={isPIP}
                  // videoID={`${playVideoName[0]}/${playVideoName[1]}.mp4`}
                  // videoID={`${playVideoInfo[0]}_${playVideoInfo[1]}`}
                  videoID={`${playVideoInfo[0]}/${playVideoInfo[0]}_${playVideoInfo[1]}`}
                />
              </Grid>
              <Grid item>
                {playVideoInfo.length !== 0 && (
                  <>
                    <div style={{ marginBottom: '10px' }}>
                      <Typography
                        variant="h2"
                        style={{ margin: '10px 0 10px 0' }}
                      >
                        {playVideoInfo[1]}
                      </Typography>
                      <Chip
                        label={playVideoInfo[0]}
                        color="secondary"
                        style={{
                          backgroundColor: `${indigo[300]}`,
                          marginRight: '10px'
                        }}
                      />
                      <Chip
                        label={playVideoInfo[2]}
                        color="secondary"
                        style={{ backgroundColor: `${pink[300]}` }}
                      />
                    </div>
                    <Divider style={{ backgroundColor: '#d1cebd' }} />
                  </>
                )}
              </Grid>
            </div>
          </Grid>
          <Grid container direction="column" alignContent="center">
            <Grid item>
              <div className={classes.expanderContainer}>
                {videoPerModel.model &&
                  Object.keys(videoPerModel.model).map(tag => (
                    <ModelExpander
                      key={tag}
                      modelTag={tag}
                      videos={videoPerModel.model[tag]}
                      setPlayVideoName={setPlayVideoInfo}
                      finalSaveHandler={finalSaveHandler}
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
