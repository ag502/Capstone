import React, { useRef } from 'react';
import ReactPlayer from 'react-player';

function VideoPlayer({ videoID, onDuration, mode, isPIP }) {
  let url = null;
  const videoRef = useRef(null);

  if (videoID) {
    if (mode === 'clipping') {
      url = `https://www.youtube.com/watch?v=${videoID}`;
    } else if (mode === 'CLIPPEDVIDEO') {
      url = `/clippingVideo/${videoID}.mp4`;
    } else if (mode === 'TEST') {
      url = `/frames/${videoID}.mp4`;
    } else if (mode === 'STORAGE') {
      url = `https://aws-s3-capstone.s3.ap-northeast-2.amazonaws.com/${videoID}`;
    }
  }

  if (videoRef.current) {
    const videoHTML = videoRef.current.getInternalPlayer();

    if (isPIP === true && videoHTML.readyState !== 0) {
      if (videoHTML !== document.pictureInPictureElement) {
        videoHTML.requestPictureInPicture();
      }
    } else if (isPIP === false && videoHTML.readyState !== 0) {
      if (videoHTML === document.pictureInPictureElement) {
        document.exitPictureInPicture();
      }
    }
  }

  return (
    <ReactPlayer
      ref={videoRef}
      url={url}
      controls
      style={{ backgroundColor: 'black', margin: 'auto' }}
      onDuration={onDuration}
      pip={mode === 'TEST' ? true : false}
      onEnablePIP={event =>
        console.log(event, document.pictureInPictureElement)
      }
      onDisablePIP={event => console.log(event)}
    />
  );
}

export default VideoPlayer;
