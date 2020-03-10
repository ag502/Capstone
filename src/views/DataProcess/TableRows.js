import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TableRow, TableCell, Checkbox, Avatar, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { playVideo } from '../../actions';
import CircularProgress from "../../components/Progress"

const TableRows = ({ videoInfo, selectedClippedV, handleSelectOne, classes }) => {
  const key = `${videoInfo.videoId}_${videoInfo.startTime}-${videoInfo.endTime}`;
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.clippingVideo[key]);

  console.log(isLoading);
  console.log(key);

  const videoIdClickHandler = (videoID, startTime, endTime) => {
    const videoName = `${videoID}_${startTime}-${endTime}`;
    dispatch(playVideo(videoName, videoID));
  };

  return (
    <TableRow
      hover
      key={videoInfo.videoId}
      selected={
        selectedClippedV.indexOf(videoInfo.videoId) !== -1
      }
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={
            selectedClippedV.indexOf(videoInfo.videoId) !== -1
          }
          color="primary"
          onChange={event =>
            handleSelectOne(event, videoInfo.videoId)
          }
          value={
            selectedClippedV.indexOf(videoInfo.videoId) !== -1
          }
        />
      </TableCell>
      <TableCell align="center">
        <div
          onClick={() => videoIdClickHandler(videoInfo.videoId, videoInfo.startTime, videoInfo.endTime)}
          className={classes.videoIDContainer}
        >
          {isLoading === 1 || isLoading === undefined ?
            <Avatar
            className={classes.avatar}
            variant="rounded"
            src={`/thumbnails/${key}.png`}
          /> : null}
          {videoInfo.videoId}
        </div>
      </TableCell>
      <TableCell>
        {videoInfo.keyword}
      </TableCell>
      <TableCell align="center">{videoInfo.startTime}</TableCell>
      <TableCell align="center">{videoInfo.endTime}</TableCell>
      <TableCell align="center">
        {(isLoading === 1 || isLoading === undefined) ?
          <Button
            color="primary"
            component={RouterLink}
            size="small"
            to="/management/customers/1"
            variant="outlined"
        >
          View
        </Button> :
        <CircularProgress/> }
      </TableCell>
    </TableRow>
  );
};

export default TableRows;
