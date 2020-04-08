import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActionArea,
  CardContent,
  Box,
  Typography,
  Divider
} from '@material-ui/core';

// const modelList = [['Face API', 'Emotion Dection', 'Shadowing']];
const modelList = ['Face API', 'Emotion Dection', 'Shadowing'];

const useStyle = makeStyles(theme => ({
  card: {
    textAlign: 'center',
    width: '280px',
    marginBottom: theme.spacing(2)
  },
  cardImg: {
    width: '130px',
    height: '130px',
    borderRadius: '100%',
    display: 'inline-block',
    margin: `${theme.spacing(3)}px 0px`
  },
  cardContent: {
    padding: `${theme.spacing(1)}px 0px`
  }
}));

const Home = () => {
  const classes = useStyle();
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="space-between">
      {modelList.map(model => (
        <Box>
          <Card className={classes.card}>
            <CardActionArea>
              <img
                className={classes.cardImg}
                src="/images/models/faceApi.png"
                alt={model}
              />
              <Divider />
              <CardContent className={classes.cardContent}>
                <Typography variant="h4">{model}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default Home;
