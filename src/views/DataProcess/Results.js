import React, { useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import GenericMoreButton from 'src/components/GenericMoreButton';
import TableEditBar from 'src/views/DataProcess/TableEditBar';
import { addPreproList } from '../../actions';
import VideoPlayerPopUp from '../../components/Video/VideoPlayerPopup';
import TableRows from './TableRows';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 700
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(3)
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'center'
  },
  pageSelector: {
    '&::before': {
      border: 0
    },
    '&::after': {
      border: 0
    },
    '&:hover:not(.Mui-disabled):before': {
      border: '0px'
    },
    margin: '0px 10px 0px 10px',
    fontSize: '16px'
  }
}));

function Results({ className, clippedVideos, setClippedVideos, ...rest }) {
  const classes = useStyles();
  const [selectedClippedV, setSelectedClippedV] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { isPlay, title, selectedVideoID } = useSelector(
    state => state.videoPlay
  );
  const dispatch = useDispatch();

  const [selectedVT, setSelectedVT] = useState({});

  const handleSelectAll = event => {
    const selectedClippedVs = event.target.checked
      ? clippedVideos
          .slice(page * rowsPerPage, (1 + page) * rowsPerPage)
          .map(
            (video, idx) =>
              `${idx},${video.videoId},${video.startTime},${video.endTime},${video.keyword}`
          )
      : [];
    setSelectedClippedV(selectedClippedVs);
  };

  const handleSelectOne = (event, id) => {
    if (selectedClippedV.includes(id)) {
      setSelectedClippedV(prevState => prevState.filter(video => video !== id));
    } else {
      setSelectedClippedV(prevState => [...prevState, id]);
    }
  };

  const handleSelectAllT = event => {
    const selectedClippedVs = event.target.checked
      ? clippedVideos
          .slice(page * rowsPerPage, (1 + page) * rowsPerPage)
          .reduce(
            (acc, video, idx) => ({
              ...acc,
              [`${idx},${video.videoId},${video.startTime},${video.endTime},${video.keyword}`]: ''
            }),
            {}
          )
      : {};
    setSelectedVT(selectedClippedVs);
  };

  const handleSelectOneT = (event, id, model, changeModel = 0) => {
    if (id in selectedVT) {
      if (changeModel === 0) {
        const newSelected = Object.keys(selectedVT).reduce((acc, videoId) => {
          if (videoId !== id) {
            return { ...acc, [videoId]: selectedVT[videoId] };
          }
          return acc;
        }, {});
        setSelectedVT(newSelected);
      } else if (changeModel === 1) {
        setSelectedVT(prevState => ({ ...prevState, [id]: model }));
      }
    } else if (!(id in selectedVT) && changeModel !== 1) {
      setSelectedVT(prevState => ({ ...prevState, [id]: model }));
    }
  };

  const chagePageHandler = (event, page) => {
    setPage(page - 1);
  };

  const changeRowsPerPageHandler = event => {
    setRowsPerPage(event.target.value);
  };

  const deleteVideoHandler = event => {
    axios
      .post('http://127.0.0.1:8000/preprocessor_delete/', {
        // videoInfo: selectedClippedV
        videoInfo: Object.keys(selectedVT)
      })
      .then(res => {
        setClippedVideos(prevState =>
          prevState.filter(
            (video, idx) =>
              !(
                [
                  `${idx % rowsPerPage},${video.videoId},${video.startTime},${
                    video.endTime
                  },${video.keyword}`
                ] in selectedVT
              )
          )
        );
        setSelectedVT({});
      });
  };

  const viewVideoHandler = () => {
    console.log(selectedClippedV);
  };

  const preprocessorClickHandler = () => {
    const promise = Object.keys(selectedVT).map(id => {
      const [idx, videoId, startTime, endTime, keyword] = id.split(',');
      dispatch(addPreproList({ [id]: [selectedVT[id], 'RUN'] }));
      return axios
        .post('http://127.0.0.1:8000/preprocessor_save/', {
          videoId: `${videoId}`,
          keyword: `${keyword}`,
          startTime: `${startTime}`,
          endTime: `${endTime}`,
          model_tag: `${selectedVT[id]}`
        })
        .then(res =>
          dispatch(addPreproList({ [id]: [selectedVT[id], 'FINISH'] }))
        );
    });

    axios.all(promise).then(res => console.log(res));
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <VideoPlayerPopUp
        isPlay={isPlay}
        videoID={selectedVideoID}
        title={title}
        mode="CLIPPEDVIDEO"
      />
      <Typography color="textSecondary" gutterBottom variant="body2">
        {`${clippedVideos.length} Records found. Page
        ${page + 1} of ${Math.ceil(clippedVideos.length / rowsPerPage)}`}
      </Typography>
      <Card>
        <CardHeader
          action={
            <>
              <span>Rows per page:</span>
              <Select
                className={classes.pageSelector}
                value={rowsPerPage}
                onChange={changeRowsPerPageHandler}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
              </Select>
              <GenericMoreButton />
            </>
          }
          title="All Videos"
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={
                          // selectedClippedV.length ===
                          // clippedVideos.slice(
                          //   page * rowsPerPage,
                          //   (1 + page) * rowsPerPage
                          // ).length
                          Object.keys(selectedVT).length ===
                          clippedVideos.slice(
                            page * rowsPerPage,
                            (1 + page) * rowsPerPage
                          ).length
                        }
                        color="primary"
                        indeterminate={
                          selectedClippedV.length > 0 &&
                          selectedClippedV.length < clippedVideos.length
                        }
                        // onChange={handleSelectAll}
                        onChange={handleSelectAllT}
                      />
                    </TableCell>
                    <TableCell padding="checkbox" />
                    <TableCell align="left">Video ID</TableCell>
                    <TableCell align="center">Keyword</TableCell>
                    <TableCell align="center">Start Time</TableCell>
                    <TableCell align="center">End Time</TableCell>
                    <TableCell align="center">Model</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clippedVideos
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((video, idx) => (
                      <TableRows
                        key={`${idx}_${video.videoId}_${video.startTime}-${video.endTime}`}
                        index={idx}
                        classes={classes}
                        videoInfo={video}
                        selectedClippedV={selectedClippedV}
                        selectedVT={selectedVT}
                        handleSelectOneT={handleSelectOneT}
                        handleSelectOne={handleSelectOne}
                      />
                    ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <Pagination
            count={Math.ceil(clippedVideos.length / rowsPerPage)}
            shape="rounded"
            onChange={chagePageHandler}
            size="large"
          />
        </CardActions>
      </Card>
      <TableEditBar
        // selected={selectedClippedV}
        selected={selectedVT}
        onApplyModel={preprocessorClickHandler}
        onDelete={deleteVideoHandler}
        onView={viewVideoHandler}
      />
    </div>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  clippedVideos: PropTypes.array
};

Results.defaultProps = {
  clippedVideos: []
};

export default Results;
