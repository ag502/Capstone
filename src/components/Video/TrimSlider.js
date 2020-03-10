import React from 'react';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  slider: {
    width: '640px',
    padding: '0 7px 0 7px'
  }
}));

function TrimSlider({ value, duration, changed }) {
  const classes = useStyles();

  const secondToMinute = value => {
    if (value < 10) {
      return `0:0${value}`;
    }
    if (value >= 10 && value < 60) {
      return `0:${value}`;
    }
    if (value >= 60 && value < 3600) {
      const minute = Math.floor(value / 60);
      const second = secondToMinute(value % 60);
      return minute + second.slice(1);
    }
    const minute = Math.floor(value / 60);
    const hour = Math.floor(minute / 60);
    const second = secondToMinute(value % 60);
    return hour + secondToMinute(minute).slice(1) + second.slice(1);
  };

  return (
    <div className={classes.slider}>
      <Slider
        value={value}
        max={duration - 1}
        onChange={changed}
        valueLabelDisplay="auto"
        valueLabelFormat={secondToMinute}
        aria-labelledby="range-slider"
      />
    </div>
  );
}

export default TrimSlider;
