import React from 'react';
import './VideoFolderCard.css';
import { Chip, Link } from '@material-ui/core';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';

const VideoFolderCard = ({ videoInfo }) => {
  const { videoId, startTime, endTime, keyword } = videoInfo;
  const { url } = useRouteMatch();

  return (
    <Link
      component={RouterLink}
      to={`${url}/${videoId}&${startTime}&${endTime}&${keyword}`}
    >
      <div className="card">
        <div className="imgBx">
          <img
            src={`/thumbnails/${videoId}_${startTime}-${endTime}.png`}
            alt="images"
          />
        </div>
        <div className="details">
          <h4>{`${videoId}_${startTime}_${endTime}`}</h4>
          <Chip size="small" label={keyword} />
        </div>
      </div>
    </Link>
  );
};

export default VideoFolderCard;
