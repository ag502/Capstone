import * as actionTypes from 'src/actions';

const initialState = {
  isPlay: false,
  title: '',
  selectedVideoID: ''
};

const videoPlayReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLAY_VIDEO:
      return {
        ...initialState,
        isPlay: true,
        title: action.payload.title,
        selectedVideoID: action.payload.videoID,
      };
    case actionTypes.CLOSE_VIDEO:
      return {
        ...initialState,
        isPlay: false,
        title: '',
        selectedVideoID: ''
      };
    default:
      return state;
  }
};

export default videoPlayReducer;
