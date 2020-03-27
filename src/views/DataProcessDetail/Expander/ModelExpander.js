import React, { useState } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  GridList,
  GridListTile,
  GridListTileBar
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { setVideoData } from 'src/actions';
import VideoList from './VideoList';

const useStyles = makeStyles(theme => ({
  gridListContainer: {
    width: '100%'
  },
  gridList: {
    flexWrap: 'nowrap'
  }
}));

const ModelExpander = ({ modelTag, videos, setPlayVideoName }) => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

  const expandHandler = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const thumbnailClickHandler = (modelTag, videoName) => () => {
    setPlayVideoName([modelTag, videoName]);
  };

  return (
    <div>
      <ExpansionPanel
        expanded={expanded === modelTag}
        onChange={expandHandler(modelTag)}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          {modelTag}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.gridListContainer}>
            <GridList className={classes.gridList}>
              {videos.map(video => {
                const videoName = `${video.videoId}_${video.startTime}-${video.endTime}_${video.video_number}`;
                return (
                  <GridListTile cols={0.7} key={videoName}>
                    <img
                      src={`https://aws-s3-capstone.s3.ap-northeast-2.amazonaws.com/${modelTag}/thumbnails/${modelTag}_${videoName}.png`}
                      alt={videoName}
                      onClick={thumbnailClickHandler(
                        modelTag,
                        `${modelTag}_${videoName}`
                      )}
                    />
                    <GridListTileBar title={videoName} />
                  </GridListTile>
                );
              })}
            </GridList>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default ModelExpander;
