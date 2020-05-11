import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GridList, GridListTile } from '@material-ui/core';
import axios from 'axios';
import VideoFolderCard from './VideoFolderCard';
import SearchFilter from '../../Filter';

const VideoGroup = () => {
  const [videoList, setVideoList] = useState([]);
  const { model } = useParams();

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`http://localhost:8000/datamanagement/${model}/`)
        .then(res => {
          setVideoList(res.data);
        })
        .catch(err => console.log(err));
    };

    fetchData();
  }, []);

  return (
    <>
      <SearchFilter model={model} setVideoList={setVideoList} />
      <GridList cellHeight="auto" cols={4} style={{ width: '100%' }}>
        {videoList.map(video => (
          <GridListTile>
            <VideoFolderCard videoInfo={video} />
          </GridListTile>
        ))}
      </GridList>
    </>
  );
};

export default VideoGroup;
