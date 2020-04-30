import React, { useState, useEffect} from 'react';
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
import Face from './Face';
import ReactPlayer from 'react-player';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  tabs: {
    marginTop: theme.spacing(3),
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  container: {
    maxWidth:"lg"
  },
  modelContainer: {
    paddingBottom: theme.spacing(3),
    maxWidth: '54%',
    maxHeight: '428px',
    margin: '0 0 0 0'
  },
  listContainer: {
    paddingBottom: theme.spacing(3),
    maxWidth:"46%",
    margin: "0 0 0 0"
  },
  videoCard: {
    marginTop: theme.spacing(3),
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    
  },
  ListCard: {
    maxHeight: '448px',
    marginTop: theme.spacing(3),
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    display: 'flex',
    overflow: 'hidden'
  },
  media: {
    padding: '100px 150px'
  }
}));

function TestingModel() {
  const classes = useStyles();
  const [videoList, setVideoList] = useState([]);
  const [videoInfo, setVideoInfo] = useState([]);
  const { modelName } = useParams();

  const thumbnailClickHandler = (videoId, startTime, endTime, videoNumber, keyword, createdAt) => () => {
    setVideoInfo([videoId, startTime, endTime, videoNumber, keyword, createdAt.substr(0, 10)]);
  };


  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`http://localhost:8000/testing/${modelName}/`)
        .then(res => {
          setVideoList(res.data);
        })
        .catch(err => console.log(err));
    };

    fetchData();
  }, []);


  return (
    <Page 
      className={classes.root}
      title="TestingModel"
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
          <Tabs className={classes.tabs}>
            <Tab
              label={modelName}
              disabled
            />
          </Tabs>
          <Divider className={classes.divider} />
          <Card className={classes.videoCard}>
            <CardMedia>
              <ReactPlayer
                url={`https://aws-s3-capstone.s3.ap-northeast-2.amazonaws.com/${modelName}/${modelName}_${videoInfo[0]}_${videoInfo[1]}-${videoInfo[2]}_${videoInfo[3]}.mp4`} 
                controls
                width='100%'
              />
              {/* <video id="video" src = {`https://aws-s3-capstone.s3.ap-northeast-2.amazonaws.com/${modelName}/${modelName}_${videoInfo[0]}_${videoInfo[1]}-${videoInfo[2]}_${videoInfo[3]}.mp4`} controls></video> */}
            </CardMedia>
            <CardContent>
              <Chip
                color="default"
                label={`date : ${videoInfo[5]}`}
              />
              <Chip
                color="primary"
                label={`keyword : ${videoInfo[4]}`}
              />
            </CardContent>
          </Card>
        </Container>
        <Container className={classes.listContainer}>
          <Tabs className={classes.tabs}>
            <Tab
              label="VIDEO LIST"
              disabled
            />
          </Tabs>
          <Divider className={classes.divider} />
          <Card className={classes.ListCard}>
            <GridList
            cellHeight="auto" 
            cols={1} 
            spacing={2}
            >
              {videoList.map(video => (
                <GridListTile
                  key={video}
                  // container
                  // item
                  // direction="row"
                  // justify="space-between"
                >
                  <CardMedia
                    className={classes.media}
                    image={`https://aws-s3-capstone.s3.ap-northeast-2.amazonaws.com/${modelName}/thumbnails/${modelName}_${video['videoId']}_${video['startTime']}-${video['endTime']}_${video['video_number']}.png`}
                    onClick={thumbnailClickHandler(
                      video['videoId'],
                      video['startTime'],
                      video['endTime'],
                      video['video_number'],
                      video['keyword'],
                      video['created_at']
                    )}
                  />
                  <GridListTileBar
                      title={`keyword : ${video['keyword']} date : ${video['created_at'].substr(0,10)}`}
                  />
                </GridListTile>
                ))}
            </GridList>
          </Card>
        </Container>
      </Grid>
    </Page>
  );
}

export default TestingModel;
