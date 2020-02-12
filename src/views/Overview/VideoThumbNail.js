import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Link from '@material-ui/core/Link';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  title: {
    height: '100%',
    width: '100%',
    verticalAlign: 'center',
    padding: '12px',
    // '& Typography': {
    //   cursor: 'pointer',
    // }
    cursor: 'pointer'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function VideoThumbNail({publishDate,
                        channelId,
                        channelTitle,
                        title,
                        thumbnail}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.title}>
        <Tooltip
          title={title}
          enterDelay={600}
        >
          <Typography
            noWrap={true}
            display={'block'}
            variant={'h5'}
          >
            {title}
          </Typography>
        </Tooltip>
        <Typography
          noWrap={true}
          display={'block'}
          variant={'subtitle1'}
        >
          <Link
            href={`https://www.youtube.com/channel/${channelId}`}
            target={'_blank'}
            rel={'noreferrer'}
          >
            {channelTitle}
          </Link>
        </Typography>
        <Typography
          noWrap={true}
          display={'block'}
          variant={'subtitle2'}
        >
          {publishDate}
        </Typography>
      </div>
      <CardMedia
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
