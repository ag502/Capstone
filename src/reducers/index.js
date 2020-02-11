import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import videoDataReducer from './videoDataReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  videoData: videoDataReducer,
});

export default rootReducer;
