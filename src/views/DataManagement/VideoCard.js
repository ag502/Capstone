import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1)
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  videoID: {
    width: '150px'
  },
  figure: {
    width: '85px'
  }
}));

const VideoCard = ({ videoInfo }) => {
  const {
    videoId,
    keyword,
    startTime,
    endTime,
    model_tag: model,
    created_at: createTime
  } = videoInfo;

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div className={classes.videoID}>
          <Typography variant="h5">{videoId}</Typography>
          <Typography variant="body2">Video ID</Typography>
        </div>
        <div className={classes.figure}>
          <Typography variant="h5">{keyword}</Typography>
          <Typography variant="body2">Video Keyword</Typography>
        </div>
        <div className={classes.figure}>
          <Typography variant="h5">{model}</Typography>
          <Typography variant="body2">Model</Typography>
        </div>
        <div className={classes.figure}>
          <Typography variant="h5">{createTime.split('T')[0]}</Typography>
          <Typography variant="body2">Created Date</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
