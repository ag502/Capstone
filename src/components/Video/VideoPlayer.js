import React from 'react';
import ReactPlayer from 'react-player';

function VideoPlayer({ videoID, onDuration, mode }) {
  let url = null;

  if (mode === 'clipping') {
    url = `https://www.youtube.com/watch?v=${videoID}`;
  } else if (mode === 'CLIPPEDVIDEO') {
    url = `/clippingVideo/${videoID}.mp4`;
  } else if (mode === 'TRIMEDVIDEO') {
    url = `/trimedVideo/${videoID}.mp4`;
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
