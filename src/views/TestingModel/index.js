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
  Grid,
  colors
} from '@material-ui/core';
import axios from 'src/utils/axios';
import Header from './Header';
import FilesDropzone from 'src/components/FilesDropzone';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  tabs: {
    marginTop: theme.spacing(3),
  },
  divider: {
    backgroundColor: colors.grey[300],
  },
  container: {
    maxWidth:"lg"
  },
  videoContainer: {
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
            label="모델이름 어떻게 가져오나?"
            disabled
            />
        </Tabs>
        <Divider className={classes.divider} />
      </Container>
      <Container 
        className={classes.videoContainer} 
      >
        <Header />
        <Tabs
          className={classes.tabs}
        >
            <Tab
            label="비디오 컨테이너"
            disabled
            />
        </Tabs>
        <Divider className={classes.divider} />
      </Container>
    </Page>
  );
}

export default TestingModel;
