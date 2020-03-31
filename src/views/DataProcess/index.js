import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import { getClippedVideos } from 'src/utils/axios';
// import axios from 'axios';
import Page from 'src/components/Page';
import Results from './Results';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

function DataProcess() {
  const classes = useStyles();
  const [clippedVideos, setClippedVideos] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchClippedVideos = () => {
      getClippedVideos().then(response => {
        if (mounted) {
          console.log(response);
          setClippedVideos(response.data);
        }
      });
    };

    fetchClippedVideos();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Page className={classes.root} title="Customer Management List">
      <Container maxWidth={false}>
        {clippedVideos && (
          <Results
            className={classes.results}
            clippedVideos={clippedVideos}
            setClippedVideos={setClippedVideos}
          />
        )}
      </Container>
    </Page>
  );
}

export default DataProcess;
