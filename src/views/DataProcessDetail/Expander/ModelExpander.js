import React, { useState } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
  GridList,
  GridListTile,
  GridListTileBar,
  Checkbox,
  Divider,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { setVideoData } from 'src/actions';
import VideoList from './VideoList';

const useStyles = makeStyles(theme => ({
  expander: {
    '&.Mui-expanded:last-child': {
      marginBottom: theme.spacing(3)
    },
    '&.Mui-expanded:first-child': {
      marginBottom: theme.spacing(3)
    }
  },
  gridListContainer: {
    width: '100%'
  },
  gridList: {
    flexWrap: 'nowrap'
  },
  checkbox: {
    color: pink[200],
    '&.Mui-checked': {
      color: pink[300]
    }
  }
}));

const ModelExpander = ({ modelTag, videos, setPlayVideoName }) => {
  const [expanded, setExpanded] = useState(false);
  const [checkedVideo, setCheckedVideo] = useState([]);
  const classes = useStyles();

  const expandHandler = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if (checkedVideo.length) {
      setCheckedVideo([]);
    }
  };

  const thumbnailClickHandler = (modelTag, videoName) => () => {
    setPlayVideoName([modelTag, videoName]);
  };

  const selectVideoHandler = videoName => () => {
    if (checkedVideo.includes(videoName)) {
      setCheckedVideo(prevState =>
        prevState.filter(video => video !== videoName)
      );
    } else {
      setCheckedVideo(prevState => [...prevState, videoName]);
    }
  };

  return (
    <div>
      <ExpansionPanel
        className={classes.expander}
        expanded={expanded === modelTag}
        onChange={expandHandler(modelTag)}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          {modelTag}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.gridListContainer}>
            <GridList className={classes.gridList}>
              {videos.map((video, index) => {
                const videoName = `${video.videoId}_${video.startTime}-${video.endTime}_${video.video_number}`;
                return (
                  <GridListTile
                    cols={0.7}
                    key={videoName}
                    className={classes.gridListTile}
                  >
                    <img
                      // src={`https://aws-s3-capstone.s3.ap-northeast-2.amazonaws.com/${modelTag}/thumbnails/${modelTag}_${videoName}.png`}
                      src={`/frames/${modelTag}_${videoName}.png`}
                      alt={videoName}
                      style={{ width: '100%' }}
                      onClick={thumbnailClickHandler(
                        modelTag,
                        `${modelTag}_${videoName}`
                      )}
                    />
                    <GridListTileBar
                      title={videoName}
                      actionIcon={
                        <Checkbox
                          className={classes.checkbox}
                          onClick={selectVideoHandler(videoName)}
                          checked={checkedVideo.includes(videoName)}
                        />
                      }
                    />
                  </GridListTile>
                );
              })}
            </GridList>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        {checkedVideo.length ? (
          <ExpansionPanelActions>
            <Button>Delete</Button>
          </ExpansionPanelActions>
        ) : null}
      </ExpansionPanel>
    </div>
  );
};

export default ModelExpander;
