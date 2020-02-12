import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import videoDataReducer from './videoDataReducer';
import videoPlayReducer from "./videoPlayReducer";

const rootReducer = combineReducers({
  session: sessionReducer,
  videoData: videoDataReducer,
  videoPlay: videoPlayReducer,
});

export default rootReducer;
