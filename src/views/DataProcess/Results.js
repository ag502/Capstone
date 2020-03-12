import React, { useState } from 'react';
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
  TablePagination,
  TableRow,
  Typography,
  Select,
  MenuItem
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import GenericMoreButton from 'src/components/GenericMoreButton';
import TableEditBar from 'src/components/TableEditBar';
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

  const handleSelectAll = event => {
    const selectedClippedVs = event.target.checked
      ? clippedVideos
          .slice(page * rowsPerPage, (1 + page) * rowsPerPage)
          .map(
            (video, idx) =>
              `${idx}_${video.videoId}_${video.startTime}-${video.endTime}`
          )
      : [];
    setSelectedClippedV(selectedClippedVs);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedClippedV.indexOf(id);
    let newSelectedCustomers = [];

    if (selectedIndex === -1) {
      newSelectedCustomers = newSelectedCustomers.concat(selectedClippedV, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomers = newSelectedCustomers.concat(
        selectedClippedV.slice(1)
      );
    } else if (selectedIndex === selectedClippedV.length - 1) {
      newSelectedCustomers = newSelectedCustomers.concat(
        selectedClippedV.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomers = newSelectedCustomers.concat(
        selectedClippedV.slice(0, selectedIndex),
        selectedClippedV.slice(selectedIndex + 1)
      );
    }
    setSelectedClippedV(newSelectedCustomers);
  };

  const chagePageHandler = (event, page) => {
    setPage(page - 1);
  };

  const changeRowsPerPageHandler = event => {
    setRowsPerPage(event.target.value);
  };

  const deleteVideoHandler = event => {
    const _clippedVideos = [...clippedVideos]
      .slice(page * rowsPerPage, (1 + page) * rowsPerPage)
      .filter(
        (video, idx) =>
          !selectedClippedV.includes(
            `${idx}_${video.videoId}_${video.startTime}-${video.endTime}`
          )
      );
    setSelectedClippedV([]);
    if (page === 0) {
      setClippedVideos([
        ..._clippedVideos,
        ...clippedVideos.slice((1 + page) * rowsPerPage)
      ]);
    } else if (page === Math.ceil(clippedVideos.length / rowsPerPage)) {
      setClippedVideos([
        ...clippedVideos.slice(0, page * rowsPerPage),
        ..._clippedVideos
      ]);
    } else {
      setClippedVideos([
        ...clippedVideos.slice(0, page * rowsPerPage),
        ..._clippedVideos,
        ...clippedVideos.slice((1 + page) * rowsPerPage)
      ]);
    }
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <VideoPlayerPopUp
        isPlay={isPlay}
        videoID={selectedVideoID}
        title={title}
        mode="general"
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
                        checked={selectedClippedV.length === rowsPerPage}
                        color="primary"
                        indeterminate={
                          selectedClippedV.length > 0 &&
                          selectedClippedV.length < clippedVideos.length
                        }
                        onChange={handleSelectAll}
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
      <TableEditBar selected={selectedClippedV} onDelete={deleteVideoHandler} />
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
