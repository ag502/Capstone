import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Link from '@material-ui/core/Link';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { playVideo } from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  title: {
    height: '100%',
    width: '100%',
    verticalAlign: 'center',
    padding: '12px',
    cursor: 'pointer'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    cursor: 'pointer'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

function VideoThumbNail({
  publishDate,
  channelID,
  channelTitle,
  videoID,
  title,
  thumbnail
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const showVideoPopUp = event => {
    console.log(event.target);
    console.log(title);
    dispatch(playVideo(videoID, title));
  };

  const moveToChannel = event => {
    // event.stopPropagation();
    console.log('Move to Channel!!');
  };

  return (
    <Card className={classes.root}>
      <div className={classes.title}>
        <Tooltip onClick={showVideoPopUp} title={title} enterDelay={600}>
          <Typography noWrap display="block" variant="h5">
            {title}
          </Typography>
        </Tooltip>
        <Typography noWrap display="block" variant="subtitle1">
          <Link
            href={`https://www.youtube.com/channel/${channelID}`}
            target="_blank"
            rel="noreferrer"
            onClick={moveToChannel}
          >
            {channelTitle}
          </Link>
        </Typography>
        <Typography noWrap display="block" variant="subtitle2">
          {publishDate}
        </Typography>
      </div>
      <CardMedia
        onClick={showVideoPopUp}
        className={classes.media}
        image={thumbnail}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default VideoThumbNail;
