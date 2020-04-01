import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Label from 'src/components/Label';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3)
  }
}));

const Header = ({ videoInfo, videoKeywords }) => {
  const [videoID, startTime, endTime] = videoInfo.split('&');
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2">{`${videoID}_${startTime}_${endTime}`}</Typography>
      {videoKeywords &&
        videoKeywords.map(keyword => (
          <Label color="#66bb6a" key={keyword}>
            {keyword}
          </Label>
        ))}
    </div>
  );
};

export default Header;
