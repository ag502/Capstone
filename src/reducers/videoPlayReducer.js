import * as actionTypes from 'src/actions';

const initialState = {
  isPlay: false,
  selectedVideoID: ''
};

const videoPlayReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLAY_VIDEO:
      return {
        ...initialState,
        isPlay: true,
        selectedVideoID: action.payload
      };
    case actionTypes.CLOSE_VIDEO:
      return {
        ...initialState,
        isPlay: false,
        selectedVideoID: ''
      };
    default:
      return state;
  }
};

export default videoPlayReducer;
