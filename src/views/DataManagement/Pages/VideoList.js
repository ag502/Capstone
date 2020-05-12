import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import VideoPlayerPopup from '../../../components/Video/VideoPlayerPopup';
import VideoCard from '../VideoCard';
import EditBar from '../Editbar';
import AlertDialog from '../AlertDialog';

const VideoList = () => {
  const [savedVideoList, setSavedVideoList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState([]);
  const [open, setOpen] = useState({ isOpen: false, type: 'None' });
  const { isPlay, title, selectedVideoID } = useSelector(
    state => state.videoPlay
  );
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

  const checkedVideoHandler = videoName => () => {
    if (selectedVideo.includes(videoName)) {
      setSelectedVideo(prevState =>
        prevState.filter(video => video !== videoName)
      );
    } else {
      setSelectedVideo(prevState => [...prevState, videoName]);
    }
  };

  const deleteFileHandler = async () => {
    try {
      const result = await axios.post('http://localhost:8000/datamanagement/', {
        videoInfo: selectedVideo
      });
      setSavedVideoList(prevState =>
        prevState.filter(
          ({ model_tag, videoId, startTime, endTime, video_number, keyword }) =>
            !selectedVideo.includes(
              `${model_tag},${keyword},${videoId},${startTime},${endTime},${video_number}`
            )
        )
      );
      setSelectedVideo([]);
      setOpen({ isOpen: false, type: 'None' });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <VideoPlayerPopup
        isPlay={isPlay}
        mode="TEST"
        videoID={selectedVideoID}
        title={title}
      />
      {savedVideoList.map((video, idx) => (
        <VideoCard
          key={idx}
          videoInfo={video}
          checkedVideoHandler={checkedVideoHandler}
          selectedVideo={selectedVideo}
        />
      ))}
      <EditBar selected={selectedVideo} setOpen={setOpen} />
      <AlertDialog
        open={open.isOpen}
        type={open.type}
        setOpen={setOpen}
        selectedNumber={selectedVideo.length}
        deleteFolderHandler={deleteFileHandler}
      />
    </>
  );
};

export default VideoList;
