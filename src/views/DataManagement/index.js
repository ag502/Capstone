import React, { useState, useEffect } from 'react';
import Page from 'src/components/Page';
import { makeStyles } from '@material-ui/styles';
import { Container, Typography, Select, MenuItem } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { getProcessedVideos } from '../../utils/axios';
import VideoCard from './VideoCard';
import Filter from './Filter';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    marginTop: theme.spacing(3)
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pagination: {
    display: 'flex',
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

function DataManagement() {
  const [processedVideosList, setVideoList] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const classes = useStyles();

  useEffect(() => {
    const fetchProcessedVideos = () => {
      getProcessedVideos().then(res => {
        console.log(res.data);
        setVideoList(res.data);
      });
    };

    fetchProcessedVideos();
  }, []);

  const pageChangeHandler = (event, page) => {
    setCurrentPage(page);
  };

  const itemsPerPageChangeHandler = event => {
    setItemsPerPage(event.target.value);
  };

  return (
    <Page className={classes.root} title="DataManagement">
      <Container maxWidth={false}>
        <Filter />
        <div>
          <div className={classes.header}>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {`${
                processedVideosList.length
              } Records found. Page ${currentPage} of ${Math.ceil(
                processedVideosList.length / itemsPerPage
              )}`}
            </Typography>
            <div>
              <span>Rows per page:</span>
              <Select
                className={classes.pageSelector}
                value={itemsPerPage}
                onChange={itemsPerPageChangeHandler}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
              </Select>
            </div>
          </div>
          {processedVideosList
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map(video => (
              <VideoCard videoInfo={video} />
            ))}
        </div>
        <Pagination
          className={classes.pagination}
          count={Math.ceil(processedVideosList.length / itemsPerPage)}
          shape="rounded"
          onChange={pageChangeHandler}
          size="large"
        />
      </Container>
    </Page>
  );
}

export default DataManagement;
