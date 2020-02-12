import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Page from 'src/components/Page';
import VideoThumbNail from './VideoThumbNail';
// import Header from './Header';
// import Statistics from './Statistics';
// import Notifications from './Notifications';
// import Projects from './Projects';
// import Todos from './Todos';

const useStyles = makeStyles((theme) => ({
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
  const videoItems = useSelector(state => state.videoData.items);

  console.log('main');

  return (
    <Page className={classes.root} title="Overview">
      <div className={classes.gridContainer}>
        <GridList cellHeight={'auto'} cols={4} className={classes.gridList}>
          {videoItems.map((cur, idx) => {
            const { snippet: { publishedAt, channelId, channelTitle, title, thumbnails: { high: { url } } } } = cur;
            const publishDate = publishedAt.slice(0, 10);
            return (
              <GridListTile key={idx}>
                <VideoThumbNail
                key={idx}
                publishDate={publishDate}
                channelId={channelId}
                channelTitle={channelTitle}
                title={title}
                thumbnail={url}/>
              </GridListTile>
            );
          })
          }
        </GridList>
      </div>
    </Page>
  );
}

export default Overview;
