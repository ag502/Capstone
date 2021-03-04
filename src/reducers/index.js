import { combineReducers } from 'redux';
import videoDataReducer from './videoDataReducer';
import videoPlayReducer from './videoPlayReducer';
import clippingReducer from './clippingReducer';

const rootReducer = combineReducers({
  videoData: videoDataReducer,
  videoPlay: videoPlayReducer,
  clippingVideo: clippingReducer
});

export default rootReducer;
