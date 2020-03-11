import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Divider,
  Avatar
} from '@material-ui/core';
import Label from 'src/components/Label';

import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: blueGrey[50]
  },
  media: {
    height: 125
  },
  content: {
    paddingTop: 0,
    
  },
  avatarContainer: {
    marginTop: -48,
    display: 'flex',
    paddingBottom: 10,
    justifyContent: 'center',
    
  },
  avatar: {
    height: 130,
    width: 130,
    backgroundColor: grey[50],
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: theme.palette.common.white
  },
  divider: {
    margin: theme.spacing(2, 0),
    backgroundColor: grey[400]
  }
}));

function SubscriberCard({ subscriber, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardMedia
        className={classes.media}
        image={subscriber.cover}// 모델 이미지 가져오기
      />
      <CardContent className={classes.content}>
        <div className={classes.avatarContainer}>
           <Avatar
            alt="Subscriber"
            className={classes.avatar}
            component={RouterLink}
            src={subscriber.avatar}
            to="/profile/1/timeline"
          >
          </Avatar>
        </div>
        <Typography //// 모델 이름
          align="center"
          component={RouterLink}
          display="block"
          to="/profile/1/timeline"
          variant="h6"
        >
          {subscriber.name}
        </Typography>
        {/* <Typography
          align="center"
          variant="body2"
        >
          {subscriber.common_connections}
          {' '}
          connections in common
        </Typography> */}
        <Divider className={classes.divider} />
        <Grid
          container
          spacing={1}
        >
          {/* {subscriber.labels.map((label) => (
            <Grid
              item
              key={label}
            >
              <Label variant="outlined">{label}</Label>
            </Grid>
          ))} */}
        </Grid>
      </CardContent>
    </Card>
  );
}

SubscriberCard.propTypes = {
  className: PropTypes.string,
  subscriber: PropTypes.object.isRequired
};

export default SubscriberCard;
