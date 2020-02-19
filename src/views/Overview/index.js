import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Page from 'src/components/Page';
import CircularIndeterminate from 'src/components/Progress';
import { searchVideos } from 'src/utils/axios';
import { getMoreVideoData, loading, getVideoData } from 'src/actions';
import VideoThumbNail from '../../layouts/Video/VideoThumbNail';
import VideoPopWindow from '../../layouts/Video/VideoPlayer';
import InfiniteScroll from 'react-infinite-scroller';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    width: '100%',
    height: '100%'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  statistics: {
    marginTop: theme.spacing(3)
  },
  notifications: {
    marginTop: theme.spacing(6)
  },
  projects: {
    marginTop: theme.spacing(6)
  },
  todos: {
    marginTop: theme.spacing(6)
  }
}));

function Overview() {
  const classes = useStyles();
  const {
    isLoading,
    items: videoItems,
    searchKeyword: keyword,
    nextPageToken: nextPage
  } = useSelector(state => state.videoData);
  const { isPlay, title, selectedVideoID } = useSelector(
    state => state.videoPlay
  );
  const dispatch = useDispatch();
  console.log(keyword);

  useEffect(() => {
    if (!keyword) {
      dispatch(getVideoData({ searchKeyword: '한달살기' }));
    }
  }, []);

  const processVidoeData = async () => {
    try {
      const {
        data: {
          prevPageToken,
          nextPageToken,
          pageInfo: { totalResults },
          items
        }
      } = await searchVideos(keyword, nextPage);
      return {
        searchKeyword: keyword,
        nextPageToken: nextPageToken === undefined ? '' : nextPageToken,
        prevPageToken: prevPageToken === undefined ? '' : prevPageToken,
        totalResults,
        items
      };
    } catch (error) {
      console.log(error);
    }
  };

  const loadNextVideoData = page => {
    if (keyword) {
      processVidoeData()
        .then(result => {
          console.log(result);
          dispatch(getMoreVideoData(result));
        })
        .finally(() => {});
    }
  };

  console.log('Overview Rendering');
  return (
    <Page className={classes.root} title="Overview">
      <InfiniteScroll
        pageStart={0}
        loadMore={loadNextVideoData}
        hasMore={true}
        useWindow={true}
        loader={<CircularIndeterminate key={0} />}
      >
        <div className={classes.gridContainer}>
          <VideoPopWindow
            isPlay={isPlay}
            videoID={selectedVideoID}
            title={title}
          />

          <GridList cellHeight="auto" cols={4} className={classes.gridList}>
            {videoItems.map((cur, idx) => {
              const {
                id: { videoId },
                snippet: {
                  publishedAt,
                  channelId,
                  channelTitle,
                  title,
                  thumbnails: {
                    high: { url }
                  }
                }
              } = cur;
              const publishDate = publishedAt.slice(0, 10);
              return (
                <GridListTile key={idx}>
                  <VideoThumbNail
                    key={idx}
                    publishDate={publishDate}
                    channelID={channelId}
                    channelTitle={channelTitle}
                    videoID={videoId}
                    title={title}
                    thumbnail={url}
                  />
                </GridListTile>
              );
            })}
          </GridList>
        </div>
      </InfiniteScroll>
    </Page>
  );
}

export default Overview;
