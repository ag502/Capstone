import axios from 'axios';

const instance = axios.create();

const defaultInfo = {
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  apiKey: 'AIzaSyAwto5LXP7NT5sloIpmkd6DRiyb7XMTjc4'
};
axios.interceptors.response.use(
  res => {
    console.log(res);
    return res;
  }
  // err => {
  //   console.log(err);
  //   return err;
  // }
);
const processVideoData = (data, keyword) => {
  const {
    data: {
      prevPageToken,
      nextPageToken,
      pageInfo: { totalResults },
      items
    }
  } = data;

  return {
    searchKeyword: keyword,
    nextPageToken: nextPageToken === undefined ? '' : nextPageToken,
    prevPageToken: prevPageToken === undefined ? '' : prevPageToken,
    totalResults,
    items
  };
};

export const searchVideosKeyword = (keyword, page = '') => {
  console.log(`Send request to Youtube ${keyword}`);
  return axios
    .get(
      `${defaultInfo.baseURL}search?key=${defaultInfo.apiKey}&part=snippet&q=${keyword}&maxResults=20&pageToken=${page}&type=video`
    )
    .then(res => processVideoData(res, keyword));
};

export const searchVideosChanID = (id, page = '') => {
  console.log(`Send request to Youtube ${id}`);
  return axios
    .get(
      `${defaultInfo.baseURL}search?key=${defaultInfo.apiKey}&part=snippet&channelId=${id}&maxResults=20&pageToken=${page}&type=video`
    )
    .then(res => processVideoData(res, id));
};

export const searchVideosID = (id, page = '') => {
  console.log(`Send request to Youtube ${id}`);
  return axios
    .get(
      `${defaultInfo.baseURL}videos?key=${defaultInfo.apiKey}&part=snippet&id=${id}&maxResults=20&pageToken=${page}`
    )
    .then(res => processVideoData(res, id));
};

export default instance;
