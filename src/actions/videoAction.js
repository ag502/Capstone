export const SET_VIDEO_DATA = 'SET_VIDEO_DATA';
export const SET_MORE_VIDEO_DATA = 'SET_MORE_VIDEO_DATA';
export const SET_CHANNEL_VIDEO_DATA = 'SET_CHANNNEL_VIDEO_DATA';
export const PLAY_VIDEO = 'PLAY_VIDEO';
export const CLOSE_VIDEO = 'CLOSE_VIDEO';
export const VIDEO_DATA_LOAD = 'VIDEO_DATA_LOAD';

export const setVideoData = data => ({
  type: SET_VIDEO_DATA,
  payload: data
});

export const setChannelVideoData = data => ({
  type: SET_CHANNEL_VIDEO_DATA,
  payload: data
});

export const setMoreVideoData = data => ({
  type: SET_MORE_VIDEO_DATA,
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
