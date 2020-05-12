import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GridList, GridListTile } from '@material-ui/core';
import axios from 'axios';
import VideoFolderCard from './VideoFolderCard';
import SearchFilter from '../../Filter';
import EditBar from '../../Editbar';

const VideoGroup = () => {
  const [videoList, setVideoList] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState([]);
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

  const checkFolderHandler = folderName => () => {
    if (selectedFolder.includes(folderName)) {
      setSelectedFolder(prevState =>
        prevState.filter(folder => folder !== folderName)
      );
    } else {
      setSelectedFolder(prevState => [...prevState, folderName]);
    }
  };

  return (
    <>
      <SearchFilter model={model} setVideoList={setVideoList} />
      <GridList cellHeight="auto" cols={4}>
        {videoList.map((video, idx) => (
          <GridListTile key={idx}>
            <VideoFolderCard
              videoInfo={video}
              model={model}
              checkFolderHandler={checkFolderHandler}
              selectedFolder={selectedFolder}
            />
          </GridListTile>
        ))}
      </GridList>
      <EditBar selected={selectedFolder} />
    </>
  );
};

export default VideoGroup;
