import React from 'react';
import './VideoFolderCard.css';
import { Chip, Link, Checkbox } from '@material-ui/core';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';

const VideoFolderCard = ({
  videoInfo,
  checkFolderHandler,
  selectedFolder,
  model
}) => {
  const { videoId, startTime, endTime, keyword } = videoInfo;
  const folderName = `${videoId}_${startTime}_${endTime}`;
  const { url } = useRouteMatch();

  return (
    <div className="card">
      <Link
        component={RouterLink}
        to={`${url}/${videoId}&${startTime}&${endTime}&${keyword}`}
      >
        <div className="imgBx">
          <img
            src={`/thumbnails/${videoId}_${startTime}-${endTime}.png`}
            alt="images"
          />
        </div>
      </Link>
      <div className="details">
        <h4>{folderName}</h4>
        <Checkbox
          size="small"
          onChange={checkFolderHandler(
            `${model},${keyword},${videoId},${startTime},${endTime}`
          )}
          checked={selectedFolder.includes(
            `${model},${keyword},${videoId},${startTime},${endTime}`
          )}
          color="primary"
        />
        <Chip size="small" label={keyword} />
      </div>
    </div>
  );
};

export default VideoFolderCard;
