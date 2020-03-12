import React, { useState, useEffect} from 'react';
import Page from 'src/components/Page';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Container,
  Tabs,
  Tab,
  Divider,
  Card, CardContent, CardMedia,
  Grid, GridList,
  colors,
  Typography
} from '@material-ui/core';
import axios from 'src/utils/axios';
import Header from './Header';
import ReactPlayer from 'react-player';
import FilesDropzone from 'src/components/FilesDropzone';
import InfiniteScroll from 'src/components/InfiniteScroll';


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
  videoContainer: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1.5),
    maxWidth:"lg"
  },
  videoCard: {
    maxWidth: '60%',
    margin: 'auto',
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"
  },
  ListCard: {
    maxWidth: '35%',
    margin: 'auto',
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"
  },
  fileDropzoneContainer: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(3),
    maxWidth:"lg"
  }
}));

function TestingModel() {
  const classes = useStyles();
  const [model, setModel] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchModel = () => {
      axios.get('/api/models').then((response) => {
        if (mounted) {
          setModel(response.data.model);
        }
      });
    };

    fetchModel();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Page 
      className={classes.root}
      title="TestingModel"
    >
      <Container className={classes.container} >
        <Header />
        <Tabs
          className={classes.tabs}
        >
          <Tab
            label="Model Name!!!"
            disabled
           />
           <Tab
            disabled
           />
           <Tab
            disabled
           />
           <Tab
            disabled
           />
           <Tab
            disabled
           />
           <Tab
            disabled
           />
           <Tab
            label="VIDEO LIST!!"
            disabled
           />
        </Tabs>
        <Grid
          container
          item
          direction="row"
        >
          <Divider className={classes.divider} width="68%"/>
          <Divider backgroundColor={colors.grey[200]} width="3%"/>
          <Divider className={classes.divider} width="29%"/>
        </Grid>
      </Container>
      <Grid
        container
        item
        direction="column"
      >
        <Container 
          className={classes.videoContainer} 
        >
          <Grid
            container
            item
            direction="row"
            justify="flex-start"
          >
            <Card className={classes.videoCard}>
              <CardMedia paddingTop="25%">
                <ReactPlayer maxWidth="100%" maxHeigit="100%" url="https://aws-s3-capstone.s3.ap-northeast-2.amazonaws.com/clippingVideo/45G3McH8y1M_5-7.mp4" controls /> 
              </CardMedia>
              <CardContent>
                <Typography
                  variant={"h6"}
                >
                  video info!!!!
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.ListCard}>
              <CardMedia paddingTop="25%">
                <ReactPlayer maxWidth="100%" maxHeigit="100%" url="https://aws-s3-capstone.s3.ap-northeast-2.amazonaws.com/clippingVideo/45G3McH8y1M_5-7.mp4" controls /> 
              </CardMedia>
              <CardContent>
                <Typography
                  variant={"h6"}
                >
                  video info!!!!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Container>
        <Container className={classes.fileDropzoneContainer}>
            <Card >
              <CardContent>
                <FilesDropzone />
              </CardContent>
            </Card>
        </Container>
      </Grid>
    </Page>
  );
}

export default TestingModel;
