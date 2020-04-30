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
  Grid, GridList, GridListTile,
  colors,
  Typography,
  Button,
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
    maxHeight: '430px',
    marginTop: theme.spacing(3),
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"
  },
  media: {
    padding: '100px 150px'
  }
}));

function TestingModel() {
  const classes = useStyles();
  const [videoList, setVideoList] = useState([]);
  const { modelName } = useParams();


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
              <video id="video" src = {`https://aws-s3-capstone.s3.ap-northeast-2.amazonaws.com/${modelName}/${modelName}_7ZkkMyUMfK0_22-47_0.mp4`} controls autoplay loop></video>
              {/* <ReactPlayer url="https://aws-s3-capstone.s3.ap-northeast-2.amazonaws.com/FaceAPI/FaceAPI_7ZkkMyUMfK0_22-47_0.mp4" controls />  */}
            </CardMedia>
            <CardContent>
              <Typography
                variant={'h6'}
              >
                keyword : 혁오 date : 2020.04.21
                <Button variant="contained">Play</Button>
              </Typography>
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
            flexWrap='wrap' 
            // cellHeight="auto" 
            cols={1} 
            // spacing={0}
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
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                    >
                      keyword : {video['keyword']} 
                    </Typography>
                    <Typography
                      variant="h6"
                    >
                      date : {video['created_at'].substr(0,10)}
                    </Typography>
                  </CardContent>
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
