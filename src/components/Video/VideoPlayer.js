import React from 'react';
import ReactPlayer from 'react-player';

function VideoPlayer({ videoID, onDuration, mode }) {
  let url = null;

  if (mode === 'clipping') {
    url = `https://www.youtube.com/watch?v=${videoID}`;
  } else if (mode === 'general') {
    url = `/clippingVideo/${videoID}.mp4`;
  }

  return (
    <>
      <ReactPlayer url={url} controls onDuration={onDuration} />
    </>
  );
}

export default VideoPlayer;
