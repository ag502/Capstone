import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink, useParams, useRouteMatch } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  Box,
  Typography,
  Divider,
  Link
} from '@material-ui/core';

const modelList = ['FaceAPI', 'EmotionDetection', 'Shadowing'];

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
  const { url } = useRouteMatch();

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="space-between">
      {modelList.map(model => (
        <Box key={model}>
          <Card className={classes.card}>
            <Link component={RouterLink} to={`${url}/${model}`}>
              <CardActionArea>
                <img
                  className={classes.cardImg}
                  src="/images/models/faceApi.png"
                  alt={model}
                />
                <Divider />
                <CardContent
                  className={classes.cardContent}
                  style={{ padding: 0 }}
                >
                  <Typography variant="h4">{model}</Typography>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default Home;
