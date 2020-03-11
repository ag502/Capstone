import React, { useState, useEffect} from 'react';
import Page from 'src/components/Page';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Container,
  Tabs,
  Tab,
  Divider,
  Grid,
  colors
} from '@material-ui/core';
import axios from 'src/utils/axios';
import Header from './Header';

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
            label="abc"
            />
        </Tabs>
        <Divider className={classes.divider} />
      </Container>
      
      <div>This is Data ModelTesting Page</div>
    </Page>
  );
}

export default TestingModel;
