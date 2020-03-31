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

const TableRows = ({ videoInfo, selectedClippedV, handleSelectOne, index }) => {
  const key = `${videoInfo.videoId}/${videoInfo.startTime}/${videoInfo.endTime}/${videoInfo.keyword}`;
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
      videoId: `${videoInfo.videoId}`,
      keyword: `${videoInfo.keyword}`,
      startTime: `${videoInfo.startTime}`,
      endTime: `${videoInfo.endTime}`,
      model_tag: `${model}`
    });
  };

  const Buttons = () => {
    let component = null;

    if (isLoading === 'SUCCESS' || videoInfo.clip_complete === 'success') {
      component = (
        <>
          <IconButton onClick={preprocessorClickHandler}>
            <img
              src="/images/video-editing.png"
              width="30px"
              height="30px"
              alt="Trimming"
            />
          </IconButton>
          <Button
            color="primary"
            component={RouterLink}
            size="small"
            // to="/management/customers/1"
            to={`/data-process/${videoInfo.videoId}&${videoInfo.startTime}&${videoInfo.endTime}`}
            variant="outlined"
          >
            View
          </Button>
        </>
      );
    } else if (
      isLoading === 'LOADING' ||
      videoInfo.clip_complete === 'loading'
    ) {
      component = <ProgressLetter />;
    } else if (isLoading === 'FAIL' || videoInfo.clip_complete === 'fail') {
      component = <div>Fail</div>;
    }
    return component;
  };

  return (
    <TableRow
      hover
      key={videoInfo.videoId}
      selected={selectedClippedV.indexOf(videoInfo.videoId) !== -1}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={selectedClippedV.indexOf(`${index}/${key}`) !== -1}
          color="primary"
          onChange={event => handleSelectOne(event, `${index}/${key}`)}
          value={selectedClippedV.indexOf(videoInfo.videoId) !== -1}
        />
      </TableCell>
      <TableCell padding="checkbox">
        {isLoading === 1 || isLoading === undefined ? (
          <Avatar
            className={classes.avatar}
            variant="rounded"
            src={`/thumbnails/${videoInfo.videoId}_${videoInfo.startTime}-${videoInfo.endTime}.png`}
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
        {/* {isLoading === 1 || isLoading === undefined ? (
          <>
            <IconButton onClick={preprocessorClickHandler}>
              <img
                src="/images/video-editing.png"
                width="30px"
                height="30px"
                alt="Trimming"
              />
            </IconButton>
            <Button
              color="primary"
              component={RouterLink}
              size="small"
              // to="/management/customers/1"
              to={`/data-process/${videoInfo.videoId}&${videoInfo.startTime}&${videoInfo.endTime}`}
              variant="outlined"
            >
              View
            </Button>
          </>
        ) : (
          <ProgressLetter />
        )} */}
        {Buttons()}
      </TableCell>
    </TableRow>
  );
};

export default TableRows;
