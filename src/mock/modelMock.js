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
        avatar: '/images/models/emotions.png',
      },
      {
        id: uuid(),
        name: 'Shadowing',
        avatar: '/images/models/monaLisa.png',
      },
      {
        id: uuid(),
        name: 'Face API',
        avatar: '/images/models/faceApi.png',
      }
    ]
  }
});
