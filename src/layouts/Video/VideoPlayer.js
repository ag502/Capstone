import React, {useState, useRef} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Slider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player';
import {VideoSeekSlider} from 'react-video-seek-slider';
import { closeVideo } from '../../actions';
import '../../../node_modules/react-video-seek-slider/lib/ui-video-seek-slider.css'

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles(() => ({
  playerContainer: {
    backgroundColor: 'gray',
    width: '640px'
  },
  slider: {
    width: '640px',
  }
}));

function VideoPlay({videoID}) {
  const [isPlay, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMute, setMute] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState({ playedSeconds: 0, played: 0, loadedSeconds: 0, loaded: 0 });
  const [isSeeking, setSeeking] = useState(false);
  const playerRef = useRef(null);

  const classes = useStyles();

  const handleDuration = duration => {
    console.log(duration);
    setDuration(duration);
  };

  const handleProgress = progressState => {
    if (!isSeeking) {
      setProgress(progressState);
    }
  };

  return (
    <>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoID}`}
        ref={playerRef}
        controls={true}
        playing
        onPlay={() => console.log('hi')}
        onDuration={handleDuration}
        onProgress={handleProgress}
        onSeek={(second) => console.log(second)}
      />
      <div className={classes.playerContainer}>
        <TrimSlider duration={duration}/>
        <VideoSeekSlider
          max={duration}
          progress={400}
          currentTime={progress.playedSeconds}
          onChange={(time) => {
            setSeeking(true);
            playerRef.current.seekTo(time);
            setProgress((state) => {
              return {
                ...state,
                playedSeconds: time
              }
            });
            setSeeking(false);
          }}
          offset={0}
          secondsPrefix="00:00:"
          minutesPrefix="00:"
        />
      </div>
    </>
  )
}

function TrimSlider({duration}) {
  const classes = useStyles();
  const [value, setValue] = React.useState([0, 0]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const secondToMinute = value => {
    if (value < 10) {
      return `0:0${value}`
    } else if (value >= 10 && value < 60) {
      return `0:${value}`
    } else if (value >= 60 && value < 3600) {
      const minute = Math.floor(value / 60);
      const second = secondToMinute(value % 60);
      return minute + second.slice(1);
    } else {
      const minute = Math.floor(value / 60);
      const hour = Math.floor(minute / 60);
      const second = secondToMinute(value % 60);
      return hour + secondToMinute(minute).slice(1) + second.slice(1);
    }
  };

  return (
    <div className={classes.root}>
      <Slider
        value={value}
        max={duration - 1}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={secondToMinute}
        aria-labelledby="range-slider"
      />
    </div>
  );
}

function VideoPopWindow({
                          isPlay,
                          videoID,
                          title,
                        }) {

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeVideo());
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        maxWidth={'md'}
        fullWidth={true}
        open={isPlay}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          <VideoPlay videoID={videoID}/>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default VideoPopWindow;
