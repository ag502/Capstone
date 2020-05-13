import uuid from 'uuid/v1';
import moment from 'moment';
import { colors } from '@material-ui/core';
import mock from 'src/utils/mock';

//models
mock.onGet('/api/models').reply(200, {
  model: {
  models: [
      {
        id: uuid(),
        name: 'Emotion Detection',
        avatar: '/images/models/EmotionDetection.png',
        link: 'Testing-Model/EmotionDetection'
      },
      {
        id: uuid(),
        name: 'Real Time Face',
        avatar: '/images/models/realtime.png',
        link: 'RealTime'
      },
      {
        id: uuid(),
        name: 'Face API',
        avatar: '/images/models/FaceAPI.png',
        link: 'Testing-Model/FaceAPI'
      }
    ]
  }
});
