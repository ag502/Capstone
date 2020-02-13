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
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import {Close, PlayArrow, Pause, VolumeDown, VolumeMute, VolumeOff, VolumeUp} from '@material-ui/icons';
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
          <Close />
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
  sliderContainer: {
    width: '640px',
    padding: '0 7px 0 7px'
  },
  slider: {
    width: '100%',
  }
}));

function VideoPlay({
                     videoID,
                     getTrimmingPoint,
                   }) {
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);

  const classes = useStyles();

  const handleDuration = duration => {
    console.log(duration);
    setDuration(duration);
  };

  return (
    <>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoID}`}
        ref={playerRef}
        controls={true}
        onDuration={handleDuration}
        onSeek={(second) => console.log(second)}
      />
      <div className={classes.sliderContainer}>
        <TrimSlider
          duration={duration}
          getTrimmingPoint={getTrimmingPoint}
        />
      </div>
    </>
  )
}

function TrimSlider({
                      duration,
                      getTrimmingPoint
                    }) {
  const classes = useStyles();
  const [value, setValue] = React.useState([0, 0]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    getTrimmingPoint(value);
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
    <div className={classes.slider}>
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
  let trimmingPoint = [0, 0];

  const handleClose = () => {
    dispatch(closeVideo());
  };

  const handleClipping = event => {
    console.log('Trimming');
    // 클리핑 요청 보낼 부분
    // trimmingPoint는 cliping할 처음과 끝 부분, slider를 움직이지 않으면 0, 0을 가르킴
    // axios.post("#");
  };

  const getTrimmingPoint = (value) => {
    trimmingPoint = value;
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        maxWidth={'md'}
        fullWidth={false}
        open={isPlay}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          <VideoPlay
            videoID={videoID}
            getTrimmingPoint={getTrimmingPoint}/>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClipping} color="primary">
            Clipping
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default VideoPopWindow;
