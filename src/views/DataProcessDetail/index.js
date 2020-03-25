import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Page from 'src/components/Page';

const DataProcessDetail = () => {
  const { videoInfo } = useParams();
  const [videoID, startTime, endTime] = videoInfo.split('&');

  console.log(videoID, startTime, endTime);

  useEffect(() => {
    axios
      .post('http://localhost:8000/preprocessor/', {
        videoID,
        startTime,
        endTime
      })
      .then(res => console.log(res));
  }, []);

  return (
    <Page>
      <Container maxWidth={false} />
    </Page>
  );
};

export default DataProcessDetail;
