import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
  TableRow,
  TableCell,
  Checkbox,
  Avatar,
  Select,
  MenuItem,
  Button,
  IconButton
} from '@material-ui/core';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { playVideo } from '../../actions';
import ProgressLetter from '../../components/ProgressLetter/ProgressLetter';

const useStyles = makeStyles(() => ({
  selectBox: {
    width: '150px'
  }
}));

const TableRows = ({ videoInfo, selectedClippedV, handleSelectOne }) => {
  const key = `${videoInfo.videoId}_${videoInfo.startTime}-${videoInfo.endTime}`;
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.clippingVideo[key]);
  const [model, setModel] = useState('null');

  const classes = useStyles();

  const videoIdClickHandler = (videoID, startTime, endTime) => {
    const videoName = `${videoID}_${startTime}-${endTime}`;
    dispatch(playVideo(videoName, videoID));
  };

  const modelChangeHandler = event => {
    setModel(event.target.value);
  };

  const preprocessorClickHandler = () => {
    axios.post('http://127.0.0.1:8000/preprocessor_save/', {
      videoId: `${videoInfo.videoID}`,
      keyword: `${videoInfo.keyword}`,
      startTime: `${videoInfo.startTime}`,
      endTime: `${videoInfo.endTime}`,
      model: `${model}`
    });
  };

  return (
    <TableRow
      hover
      key={videoInfo.videoId}
      selected={selectedClippedV.indexOf(videoInfo.videoId) !== -1}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={selectedClippedV.indexOf(videoInfo.videoId) !== -1}
          color="primary"
          onChange={event => handleSelectOne(event, videoInfo.videoId)}
          value={selectedClippedV.indexOf(videoInfo.videoId) !== -1}
        />
      </TableCell>
      <TableCell padding="checkbox">
        {isLoading === 1 || isLoading === undefined ? (
          <Avatar
            className={classes.avatar}
            variant="rounded"
            src={`/thumbnails/${key}.png`}
          />
        ) : null}
      </TableCell>
      <TableCell align="left">
        <div
          onClick={() =>
            videoIdClickHandler(
              videoInfo.videoId,
              videoInfo.startTime,
              videoInfo.endTime
            )
          }
        >
          {videoInfo.videoId}
        </div>
      </TableCell>
      <TableCell align="center">{videoInfo.keyword}</TableCell>
      <TableCell align="center">{`${videoInfo.startTime}s`}</TableCell>
      <TableCell align="center">{`${videoInfo.endTime}s`}</TableCell>
      <TableCell align="center">
        <Select
          value={model}
          autoWidth
          onChange={modelChangeHandler}
          displayEmpty
        >
          <MenuItem value="null">
            <em>NULL</em>
          </MenuItem>
          <MenuItem value="EmotionDetection">Emotion Detection</MenuItem>
          <MenuItem value="Shadowing">Shadowing</MenuItem>
          <MenuItem value="FaceAPI">Face API</MenuItem>
        </Select>
      </TableCell>
      <TableCell align="center">
        {isLoading === 1 || isLoading === undefined ? (
          <>
            <IconButton onClick={preprocessorClickHandler}>
              <img src="/images/video-editing.png" width="35px" height="35px" />
            </IconButton>
            <Button
              color="primary"
              component={RouterLink}
              size="small"
              to="/management/customers/1"
              variant="outlined"
            >
              View
            </Button>
          </>
        ) : (
          <ProgressLetter />
        )}
      </TableCell>
    </TableRow>
  );
};

export default TableRows;
