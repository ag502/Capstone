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
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Avatar
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import getInitials from 'src/utils/getInitials';
import ReviewStars from 'src/components/ReviewStars';
import GenericMoreButton from 'src/components/GenericMoreButton';
import TableEditBar from 'src/components/TableEditBar';
import { playVideo } from '../../actions';
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
    justifyContent: 'flex-end'
  }
}));

function Results({ className, clippedVideos, ...rest }) {
  const classes = useStyles();
  const [selectedClippedV, setSelectedClippedV] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { isPlay, title, selectedVideoID } = useSelector(
    state => state.videoPlay
  );

  const handleSelectAll = event => {
    const selectedClippedVs = event.target.checked
      ? clippedVideos.map(customer => customer.videoId)
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

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
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
        {clippedVideos.length} Records found. Page
        {page + 1} of {Math.ceil(clippedVideos.length / rowsPerPage)}
      </Typography>
      <Card>
        <CardHeader action={<GenericMoreButton />} title="All Videos" />
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
                          selectedClippedV.length === clippedVideos.length
                        }
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
                  {clippedVideos.slice(0, rowsPerPage).map((video, idx) => (
                    <TableRows
                      key={`${idx}_${video.videoId}_${video.startTime}-${video.endTime}`}
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
          <TablePagination
            component="div"
            count={clippedVideos.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <TableEditBar selected={selectedClippedV} />
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
