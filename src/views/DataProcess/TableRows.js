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
import { playVideo, addClippingList, addPreproList } from '../../actions';
import ProgressLetter from '../../components/ProgressLetter/ProgressLetter';
import ProgressImage from '../../components/ProgressImage/ProgressImage';

const useStyles = makeStyles(() => ({
  selectBox: {
    width: '150px'
  }
}));

const TableRows = ({
  videoInfo,
  selectedClippedV,
  handleSelectOne,
  index,
  handleSelectOneT,
  selectedVT
}) => {
  // redux 저장 키 형태
  const key = `${videoInfo.videoId},${videoInfo.startTime},${videoInfo.endTime},${videoInfo.keyword}`;
  const [model, setModel] = useState('');
  const dispatch = useDispatch();
  const clippedVideoLoading = useSelector(
    state => state.clippingVideo.clipping[key]
  );
  const trimmedVideoLoading = useSelector(
    state => state.clippingVideo.preprocess[key]
  );

  const classes = useStyles();

  const videoIdClickHandler = (videoID, startTime, endTime) => {
    const videoName = `${videoID}_${startTime}-${endTime}`;
    dispatch(playVideo(videoName, videoID));
  };

  const modelChangeHandler = event => {
    handleSelectOneT(event, `${index},${key}`, event.target.value, 1);
    setModel(event.target.value);
  };

  const preprocessorClickHandler = () => {
    if (!model) {
      return;
    }

    const modelTrimmingVideo = {};
    modelTrimmingVideo[key] = [model, 'RUN'];
    dispatch(addPreproList(modelTrimmingVideo));

    axios
      .post('http://127.0.0.1:8000/preprocessor_save/', {
        videoId: `${videoInfo.videoId}`,
        keyword: `${videoInfo.keyword}`,
        startTime: `${videoInfo.startTime}`,
        endTime: `${videoInfo.endTime}`,
        model_tag: `${model}`
      })
      .catch(res => console.log(res))
      .finally(() => {
        modelTrimmingVideo[key] = [model, 'FINISH'];
        dispatch(addPreproList(modelTrimmingVideo));
      });
  };

  const Buttons = () => {
    let component = null;

    console.log(trimmedVideoLoading);
    if (
      clippedVideoLoading === 'SUCCESS' ||
      videoInfo.clip_complete === 'success'
    ) {
      component = (
        <>
          {!trimmedVideoLoading || trimmedVideoLoading[1] === 'FINISH' ? (
            <IconButton onClick={preprocessorClickHandler}>
              <img
                src="/images/video-editing.png"
                width="30px"
                height="30px"
                alt="Trimming"
              />
            </IconButton>
          ) : (
            <ProgressImage
              modelType={trimmedVideoLoading[0]}
              style={{ marginLeft: '5px' }}
            />
          )}

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
      clippedVideoLoading === 'LOADING' ||
      videoInfo.clip_complete === 'loading'
    ) {
      component = <ProgressLetter />;
    } else if (
      clippedVideoLoading === 'FAIL' ||
      videoInfo.clip_complete === 'fail'
    ) {
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
          // checked={selectedClippedV.indexOf(`${index},${key}`) !== -1}
          checked={[`${index},${key}`] in selectedVT}
          color="primary"
          onChange={event => handleSelectOneT(event, `${index},${key}`, model)}
          value={selectedClippedV.indexOf(videoInfo.videoId) !== -1}
        />
      </TableCell>
      <TableCell padding="checkbox">
        {clippedVideoLoading === 'SUCCESS' ||
        videoInfo.clip_complete === 'success' ? (
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
          <MenuItem value="" disabled>
            Model
          </MenuItem>
          <MenuItem
            disabled={videoInfo.EmotionDetection}
            value="EmotionDetection"
          >
            Emotion Detection
          </MenuItem>
          <MenuItem disabled={videoInfo.Shadowing} value="Shadowing">
            Shadowing
          </MenuItem>
          <MenuItem disabled={videoInfo.FaceAPI} value="FaceAPI">
            Face API
          </MenuItem>
        </Select>
      </TableCell>
      <TableCell align="center">{Buttons()}</TableCell>
    </TableRow>
  );
};

export default TableRows;
