export const GET_VIDEO_DATA = 'GET_VIDEO_DATA';
export const GET_MORE_VIDEO_DATA = 'GET_MORE_VIDEO_DATA';
export const PLAY_VIDEO = 'PLAY_VIDEO';
export const CLOSE_VIDEO = 'CLOSE_VIDEO';
export const VIDEO_DATA_LOAD = 'VIDEO_DATA_LOAD';

export const getVideoData = data => ({
  type: GET_VIDEO_DATA,
  payload: data
});

export const getMoreVideoData = data => ({
  type: GET_MORE_VIDEO_DATA,
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
