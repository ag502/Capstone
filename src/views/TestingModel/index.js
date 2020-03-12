import React, { useState, useEffect} from 'react';
import Page from 'src/components/Page';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Container,
  Tabs,
  Tab,
  Divider,
  Card, CardContent,
  Grid,GridList,
  colors
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
    maxWidth:"lg"
  },
  videoCard: {
    maxWidth: '75%',
    margin: 'auto',
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"
  },
  ListCard: {
    maxWidth: 300,
    maxHeight: 360,
    margin: 'auto',
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"
  },
  ListContainer: {
    paddingTop: theme.spacing(3),
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
          <Divider className={classes.divider} width="65%"/>
          <Divider backgroundColor={colors.grey[200]} width="10%"/>
          <Divider className={classes.divider} width="25%"/>
        </Grid>
      </Container>
      <Container 
        className={classes.videoContainer} 
      >
        <Grid
          container
          item
          justify="flex-start"
          direction="row"
        >
          <Card
            className={classes.videoCard}
          >
            <ReactPlayer url="https://aws-s3-capstone.s3.ap-northeast-2.amazonaws.com/clippingVideo/45G3McH8y1M_5-7.mp4" controls /> 
          </Card>
          <InfiniteScroll>
            <GridList
              className={classes.ListCard}
            >
              <ReactPlayer url="https://aws-s3-capstone.s3.ap-northeast-2.amazonaws.com/clippingVideo/45G3McH8y1M_5-7.mp4" controls />
              <ReactPlayer url="https://aws-s3-capstone.s3.ap-northeast-2.amazonaws.com/clippingVideo/45G3McH8y1M_5-7.mp4" controls />  
            </GridList>
          </InfiniteScroll>
        </Grid>
      </Container>
      <Card width="50px">
        <FilesDropzone/>
      </Card>
    </Page>
  );
}

export default TestingModel;
