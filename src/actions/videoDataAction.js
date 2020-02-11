export const GET_VIDEO_DATA = 'GET_VIDEO_DATA';

export const getVideoData = data => {
  return {
    type: GET_VIDEO_DATA,
    payload: data
  }
};
