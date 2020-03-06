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
  Typography
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import getInitials from 'src/utils/getInitials';
import ReviewStars from 'src/components/ReviewStars';
import GenericMoreButton from 'src/components/GenericMoreButton';
import TableEditBar from 'src/components/TableEditBar';
import { playVideo } from '../../actions';
import VideoPlayer from '../../components/Video/VideoPlayer';

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
    marginRight: theme.spacing(1)
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'flex-end'
  }
}));

function Results({ className, clippedVideos, ...rest }) {
  const classes = useStyles();
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { isPlay, title, selectedVideoID } = useSelector(
    state => state.videoPlay
  );
  const dispatch = useDispatch();

  const handleSelectAll = event => {
    const selectedCustomers = event.target.checked
      ? clippedVideos.map(customer => customer.videoId)
      : [];

    setSelectedCustomers(selectedCustomers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomers.indexOf(id);
    let newSelectedCustomers = [];

    if (selectedIndex === -1) {
      newSelectedCustomers = newSelectedCustomers.concat(selectedCustomers, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomers = newSelectedCustomers.concat(
        selectedCustomers.slice(1)
      );
    } else if (selectedIndex === selectedCustomers.length - 1) {
      newSelectedCustomers = newSelectedCustomers.concat(
        selectedCustomers.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomers = newSelectedCustomers.concat(
        selectedCustomers.slice(0, selectedIndex),
        selectedCustomers.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomers(newSelectedCustomers);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const videoIdClickHandler = videoId => {
    dispatch(playVideo(videoId, videoId));
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <VideoPlayer
        isPlay={isPlay}
        videoID={selectedVideoID}
        title={title}
        mode="general"
      />
      <Typography color="textSecondary" gutterBottom variant="body2">
        {clippedVideos.length} Records found. Page {page + 1} of{' '}
        {Math.ceil(clippedVideos.length / rowsPerPage)}
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
                          selectedCustomers.length === clippedVideos.length
                        }
                        color="primary"
                        indeterminate={
                          selectedCustomers.length > 0 &&
                          selectedCustomers.length < clippedVideos.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Video Id</TableCell>
                    <TableCell>Keyword</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clippedVideos.slice(0, rowsPerPage).map(customer => (
                    <TableRow
                      hover
                      key={customer.videoId}
                      selected={
                        selectedCustomers.indexOf(customer.videoId) !== -1
                      }
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={
                            selectedCustomers.indexOf(customer.videoId) !== -1
                          }
                          color="primary"
                          onChange={event =>
                            handleSelectOne(event, customer.videoId)
                          }
                          value={
                            selectedCustomers.indexOf(customer.videoId) !== -1
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <div
                          onClick={() => videoIdClickHandler(customer.videoId)}
                        >
                          {customer.videoId}
                        </div>
                      </TableCell>
                      <TableCell>{customer.keyword}</TableCell>
                      <TableCell align="right">
                        <Button
                          color="primary"
                          component={RouterLink}
                          size="small"
                          to="/management/customers/1"
                          variant="outlined"
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
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
      <TableEditBar selected={selectedCustomers} />
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
