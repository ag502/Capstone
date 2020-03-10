import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import videoDataReducer from './videoDataReducer';
import videoPlayReducer from './videoPlayReducer';
import clippingReducer from './clippingReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  videoData: videoDataReducer,
  videoPlay: videoPlayReducer,
  clippingVideo: clippingReducer,
});

export default rootReducer;
