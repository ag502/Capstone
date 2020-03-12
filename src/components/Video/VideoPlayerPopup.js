import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'; // axios
import { closeVideo, addClippingList } from '../../actions';
import VideoPlayer from './VideoPlayer';
import TrimSlider from './TrimSlider';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <Close />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  }
}));

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

function VideoPopWindow({ isPlay, videoID, title, keyword, searchType, mode }) {
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(0);
  const [value, setValue] = useState([0, 0]);
  const [alertOpen, setAlertOpen] = useState(false);
  const classes = useStyles();

  const closeClickHandler = () => {
    dispatch(closeVideo());
    setValue([0, 0]);
    setAlertOpen(false);
  };

  const closeAlertHandler = () => {
    setAlertOpen(false);
  };

  const clippingClickHandler = () => {
    if (value[0] === value[1]) {
      setAlertOpen(true);
    } else {
      console.log('Trimming');
      console.log(value[0], value[1]);
      console.log(videoID);
      // keyword
      if (searchType === 2 || searchType === 3) {
        keyword = null; // null??
      }
      console.log(keyword);

      const clippingVideo = {};
      const key = `${videoID}/${value[0]}/${value[1]}/${keyword}`;
      clippingVideo[key] = 0;

      dispatch(addClippingList(clippingVideo));

      axios
        .post('http://127.0.0.1:8000/clipping/', {
          videoId: `${videoID}`,
          keyword: `${keyword}`,
          startTime: `${value[0]}`,
          endTime: `${value[1]}`
        })
        .then(res => {
          console.log(res);
          clippingVideo[key] = 1;
          dispatch(addClippingList(clippingVideo));
        });
    }
  };

  const videoDurationHandler = playTime => {
    setDuration(playTime);
  };

  const trimmerChangeHandler = (event, newValue) => {
    setValue(newValue);
    console.log(value);
  };

  return (
    <div>
      <Snackbar open={alertOpen}>
        <Alert severity="error" onClose={closeAlertHandler}>
          구간을 설정해 주세요
        </Alert>
      </Snackbar>
      <Dialog
        aria-labelledby="customized-dialog-title"
        maxWidth="md"
        // maxWidth={false}
        fullWidth={false}
        open={isPlay}
      >
        <DialogTitle id="customized-dialog-title" onClose={closeClickHandler}>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          <div className={classes.root}>
            <VideoPlayer
              videoID={videoID}
              mode={mode}
              onDuration={videoDurationHandler}
            />
            {mode === 'clipping' && (
              <TrimSlider
                value={value}
                duration={duration}
                changed={trimmerChangeHandler}
              />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          {mode === 'clipping' && (
            <Button autoFocus onClick={clippingClickHandler} color="primary">
              Clipping
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default VideoPopWindow;
