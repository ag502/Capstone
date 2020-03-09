import React from 'react';
import ReactPlayer from 'react-player';

function VideoPlayer({ videoID, onDuration, mode }) {
  let url = null;

  if (mode === 'clipping') {
    url = `https://www.youtube.com/watch?v=${videoID}`;
  } else if (mode === 'general') {
    url = `https://firebasestorage.googleapis.com/v0/b/capstone-react-ea4ac.appspot.com/o/${videoID}.mp4?alt=media`;
  }

  return (
    <>
      <ReactPlayer url={url} controls onDuration={onDuration} />
    </>
  );
}

export default VideoPlayer;
