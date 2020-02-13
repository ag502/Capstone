export const GET_VIDEO_DATA = 'GET_VIDEO_DATA';
export const PLAY_VIDEO = 'PLAY_VIDEO';
export const CLOSE_VIDEO = 'CLOSE_VIDEO';

export const getVideoData = data => {
  return {
    type: GET_VIDEO_DATA,
    payload: data
  }
};

export const playVideo = (videoID, title) => {
  return {
    type: PLAY_VIDEO,
    payload: {
      videoID: videoID,
      title: title,
    }
  }
};

export const closeVideo = () => {
  return {
    type: CLOSE_VIDEO,
  }
};
