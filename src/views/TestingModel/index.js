import React, { useState, useEffect} from 'react';
import Page from 'src/components/Page';
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
import CircularIndeterminate from 'src/components/Progress';


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
    maxHeight: '428px',//???????
    marginTop: theme.spacing(3),
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"
  },
  fileDropzoneContainer: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(3),
    maxWidth:"lg"
  },
  media: {
    padding: '100px 150px'
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
              label="Model Name!!!"
              disabled
            />
          </Tabs>
          <Divider className={classes.divider} />
          <Card className={classes.videoCard}>
            <CardMedia>
              <ReactPlayer url="https://aws-s3-capstone/FaceAPI/FaceAPI_RIRQ4OuOZ64_0-36_0.mp4" controls /> 
            </CardMedia>
            <CardContent>
              <Typography
                variant={'h6'}
              >
                video info
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
            <InfiniteScroll
              hasMore
              pageStart={0}
              loadMore
              initialLoad
              useWindow
              loader={<CircularIndeterminate key={0} />}
            >
              <GridList cellHeight="auto" cols={1} spacing={0}>
                <Grid
                  container
                  item
                  direction="row"
                  justify="space-between"
                >
                  <CardMedia
                    className={classes.media}
                    image="https://aws-s3-capstone.s3.ap-northeast-2.amazonaws.com/thumnails/45G3McH8y1M_5-7.png"
                  />
                  <CardContent>
                    <Typography
                      variant={'h6'}
                    >
                      video info
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid
                  container
                  item
                  direction="row"
                  justify="space-between"
                >
                  <CardMedia
                    className={classes.media}
                    image="https://aws-s3-capstone.s3.ap-northeast-2.amazonaws.com/thumnails/45G3McH8y1M_5-7.png"
                  />
                  <CardContent>
                    <Typography
                      variant={'h6'}
                    >
                      video info
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid
                  container
                  item
                  direction="row"
                  justify="space-between"
                >
                  <CardMedia
                    className={classes.media}
                    image="https://aws-s3-capstone.s3.ap-northeast-2.amazonaws.com/thumnails/45G3McH8y1M_5-7.png"
                  />
                  <CardContent>
                    <Typography
                      variant={'h6'}
                    >
                      video info
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid
                  container
                  item
                  direction="row"
                  justify="space-between"
                >
                  <CardMedia
                    className={classes.media}
                    image="https://aws-s3-capstone.s3.ap-northeast-2.amazonaws.com/thumnails/45G3McH8y1M_5-7.png"
                  />
                  <CardContent>
                    <Typography
                      variant={'h6'}
                    >
                      video info
                    </Typography>
                  </CardContent>
                </Grid>
              </GridList>
            </InfiniteScroll>
          </Card>
        </Container>
      </Grid>
      <Container className={classes.fileDropzoneContainer}>
        <Card>
          <CardContent>
            <FilesDropzone />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default TestingModel;
