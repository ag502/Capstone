import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Checkbox
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { playVideo } from '../../actions/videoAction';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1)
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  videoIdContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  videoID: {
    width: '150px',
    marginLeft: theme.spacing(1)
  },
  figure: {
    width: '85px'
  }
}));

const VideoCard = ({ videoInfo, checkedVideoHandler, selectedVideo }) => {
  const {
    videoId,
    keyword,
    startTime,
    endTime,
    video_number: videoNum,
    model_tag: model,
    created_at: createTime
  } = videoInfo;

  const classes = useStyles();
  const dispatch = useDispatch();

  const videoTitle = `${model}_${videoId}_${startTime}-${endTime}_${videoNum}`;

  const handlePlayButton = () => {
    dispatch(playVideo(videoTitle, videoId));
  };

  return (
    <>
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <div className={classes.videoIdContainer}>
            <Checkbox
              onChange={checkedVideoHandler(
                `${model},${keyword},${videoId},${startTime},${endTime},${videoNum}`
              )}
              checked={selectedVideo.includes(
                `${model},${keyword},${videoId},${startTime},${endTime},${videoNum}`
              )}
            />
            <Avatar variant="rounded" src={`/frames/${videoTitle}.png`}>
              N
            </Avatar>
            <div className={classes.videoID}>
              <Typography onClick={handlePlayButton} variant="h5">
                {`${videoId}_${videoNum}`}
              </Typography>
              <Typography variant="body2">Video ID</Typography>
            </div>
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
    </>
  );
};

export default VideoCard;
