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
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { setVideoData } from 'src/actions';

const useStyles = makeStyles(theme => ({
  expander: {
    '&.Mui-expanded:last-child': {
      marginBottom: theme.spacing(3)
    },
    '&.Mui-expanded:first-child': {
      marginTop: theme.spacing(3)
    }
  },
  gridListContainer: {
    width: '100%',
    display: 'flex',
    overflow: 'hidden'
  },
  gridList: {
    flexWrap: 'wrap',
    height: '500px'
  },
  checkbox: {
    color: pink[200],
    '&.Mui-checked': {
      color: pink[300]
    }
  }
}));

const ModelExpander = ({
  modelTag,
  videos,
  setPlayVideoName,
  finalSaveHandler
}) => {
  const [expanded, setExpanded] = useState(false);
  const [checkedVideo, setCheckedVideo] = useState([]);
  const classes = useStyles();

  const expandHandler = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if (checkedVideo.length) {
      setCheckedVideo([]);
    }
  };

  const thumbnailClickHandler = (modelTag, videoName, keyword) => () => {
    setPlayVideoName([modelTag, videoName, keyword]);
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

  const onSaveClick = async () => {
    try {
      const result = await axios.post(
        'http://127.0.0.1:8000/preprocessor_final_save/',
        { videoInfo: checkedVideo }
      );
      finalSaveHandler(modelTag, checkedVideo);
    } catch (error) {
      console.log(error);
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
                    cols={2}
                    key={videoName}
                    className={classes.gridListTile}
                  >
                    <img
                      src={`https://aws-s3-capstone.s3.ap-northeast-2.amazonaws.com/${modelTag}/thumbnails/${modelTag}_${videoName}.png`}
                      // src={`/frames/${modelTag}_${videoName}.png`}
                      alt={videoName}
                      style={{ width: '100%' }}
                      onClick={thumbnailClickHandler(
                        modelTag,
                        videoName,
                        video.keyword
                      )}
                    />
                    <GridListTileBar
                      title={videoName}
                      actionIcon={
                        <Checkbox
                          className={classes.checkbox}
                          onClick={selectVideoHandler(
                            `${modelTag}_${videoName}`
                          )}
                          checked={checkedVideo.includes(
                            `${modelTag}_${videoName}`
                          )}
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
            <Button onClick={onSaveClick}>SAVE</Button>
          </ExpansionPanelActions>
        ) : null}
      </ExpansionPanel>
    </div>
  );
};

export default ModelExpander;
