import {
  searchVideosKeyword,
  searchVideosChanID,
  searchVideosID
} from '../utils/axios';

export const SET_VIDEO_DATA = 'SET_VIDEO_DATA';
export const SET_MORE_VIDEO_DATA = 'SET_MORE_VIDEO_DATA';
export const SET_CHANNEL_VIDEO_DATA = 'SET_CHANNEL_VIDEO_DATA';
export const SET_CHANNEL_MORE_VIDEO_DATA = 'SET_CHANNEL_MORE_VIDEO_DATA';
export const SET_LOAD_ERROR = 'SET_LOAD_ERROR';
export const PLAY_VIDEO = 'PLAY_VIDEO';
export const CLOSE_VIDEO = 'CLOSE_VIDEO';
export const VIDEO_DATA_LOAD = 'VIDEO_DATA_LOAD';

const saveVideoData = (data, searchType = 1) => ({
  type: SET_VIDEO_DATA,
  payload: data,
  searchType
});

export const setVideoData = (keyword, searchType = 1) => dispatch => {
  let pendingData = null;
  if (searchType === 1) {
    pendingData = searchVideosKeyword(keyword);
  } else if (searchType === 2) {
    pendingData = searchVideosID(keyword);
  } else if (searchType === 3) {
    pendingData = searchVideosChanID(keyword);
  }

  pendingData.then(res => {
    console.log(res);
    dispatch(saveVideoData(res, searchType));
  });
};

export const setChannelVideoData = data => ({
  type: SET_CHANNEL_VIDEO_DATA,
  payload: data
});

export const setMoreVideoData = data => ({
  type: SET_MORE_VIDEO_DATA,
  payload: data
});

export const setChannleMoreVidoeData = data => ({
  type: SET_CHANNEL_MORE_VIDEO_DATA,
  payload: data
});

export const setLoadError = data => ({
  type: SET_LOAD_ERROR,
  payload: data
});

export const loading = () => ({
  type: VIDEO_DATA_LOAD
});

export const playVideo = (videoID, title) => ({
  type: PLAY_VIDEO,
  payload: {
    videoID,
    title
  }
});

export const closeVideo = () => ({
  type: CLOSE_VIDEO
});
