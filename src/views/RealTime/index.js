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
import Webcam from "react-webcam";
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
    backgroundColor: colors.grey[300],
  },
  container: {
    maxWidth:"lg"
  },
  modelContainer: {
    paddingBottom: theme.spacing(3),
    maxWidth:"lg",
    maxHeight: '428px',
    margin: '0 0 0 0'
  },
}));

function TestingModel() {
  const classes = useStyles();

  const videoConstraints = {
      facingMode: "user"
    };

  return (
    <Page 
      className={classes.root}
      title="RealTime"
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
              label="emotion recognition"
            />
            <Tab
              label="age & gender"
            />
          </Tabs>
          <Divider className={classes.divider} />
        </Container>
        <Webcam
          videoConstraints={videoConstraints}
          height={720}
          width={720}
          audio={false}
        />
      </Grid>
    </Page>
  );



}

export default TestingModel;
