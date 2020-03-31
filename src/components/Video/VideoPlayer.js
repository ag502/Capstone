import React from 'react';
import ReactPlayer from 'react-player';

function VideoPlayer({ videoID, onDuration, mode }) {
  let url = null;

  if (mode === 'clipping') {
    url = `https://www.youtube.com/watch?v=${videoID}`;
  } else if (mode === 'CLIPPEDVIDEO') {
    url = `/clippingVideo/${videoID}.mp4`;
  } else if (mode === 'TEST') {
    url = `/frames/${videoID}.mp4`;
  } else if (mode === 'STORAGE') {
    url = `https://aws-s3-capstone.s3.ap-northeast-2.amazonaws.com/${videoID}`;
  }

  return (
    <>
      <ReactPlayer
        url={url}
        controls
        style={{ backgroundColor: 'black', margin: 'auto' }}
        onDuration={onDuration}
      />
    </>
  );
}

export default VideoPlayer;
