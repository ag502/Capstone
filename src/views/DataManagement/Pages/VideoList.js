import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import VideoCard from '../VideoCard';

const VideoList = () => {
  const [savedVideoList, setSavedVideoList] = useState([]);
  const { model, videoInfo } = useParams();

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`http://localhost:8000/datamanagement/${model}/${videoInfo}/`)
        .then(res => setSavedVideoList(res.data))
        .catch(err => console.log(err));
    };

    fetchData();
  }, []);

  return (
    <>
      {savedVideoList.map(video => (
        <VideoCard videoInfo={video} />
      ))}
    </>
  );
};

export default VideoList;
