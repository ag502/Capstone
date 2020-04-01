import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Page from 'src/components/Page';
import CircularIndeterminate from 'src/components/Progress';
import InfiniteScroll from '../InfiniteScroll';
import VideoThumbNail from './VideoThumbNail';
import VideoPopWindow from './VideoPlayerPopup';

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

const Videos = ({
  nextPage,
  keyword,
  loadNextVideoData,
  videoItems,
  searchType,
  mode
}) => {
  const classes = useStyles();
  const { isPlay, title, selectedVideoID } = useSelector(
    state => state.videoPlay
  );

  console.log(`Videos Rendering ${nextPage}`);
  return (
    <Page className={classes.root} title="Overview">
      <VideoPopWindow
        isPlay={isPlay}
        keyword={keyword}
        videoID={selectedVideoID}
        title={title}
        searchType={searchType}
        mode={mode}
      />
      <InfiniteScroll
        hasMore={!!nextPage && !!keyword}
        pageStart={0}
        loadMore={loadNextVideoData}
        initialLoad
        useWindow
        loader={<CircularIndeterminate key={0} />}
      >
        <div className={classes.gridContainer}>
          <GridList cellHeight="auto" cols={4} className={classes.gridList}>
            {videoItems.map((cur, idx) => {
              const {
                id: videoId,
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
                    videoID={videoId.videoId || videoId}
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
};

export default Videos;
