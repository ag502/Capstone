import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  gridList: {
    flexWrap: 'nowrap'
  }
}));

const VideoList = ({ videos }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList}>
        {videos.map(video => (
          <GridListTile cols={0.7}>
            <GridListTileBar title={video.videoId} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default VideoList;
