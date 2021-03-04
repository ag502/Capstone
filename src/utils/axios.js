import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
});

const defaultParams = {
  key: 'AIzaSyB367CrfHLcSf5BZ2rpomd71JRrU5IiTps',
  part: "snippet",
  maxResult: "20"
}


axiosInstance.interceptors.request.use(function (config) {
  console.log("-----------Request-----------")
  console.log(config)
  console.log("-----------Request-----------")

  return config;
}, function (error) {
  console.log("-----------Request-----------")
  console.log(error.response)
  console.log("-----------Request-----------")
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  console.log("-----------Response-----------")
  console.log(response)
  console.log("-----------Response-----------")

  return response;
}, function (error) {
  console.log("-----------Response-----------")
  console.log(error.response)
  console.log("-----------Response-----------")

  return Promise.reject(error);
});

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
  return axiosInstance
    .get(
      "/search"
    , {
        params: {
          ...defaultParams,
          q: keyword,
          maxResult: "20",
          type: "video",
          pageToken: page
        }
      })
    .then(res => processVideoData(res, keyword))
    .catch(error => console.log(error.response))
};

export const searchVideosChanID = (id, page = '') => {
  return axiosInstance
    .get(
      `search`, {
        params: {
          ...defaultParams,
          channelId: id,
          type: "video",
          pageToken: page,
        }
      }
    )
    .then(res => processVideoData(res, id));
};

export const searchVideosID = (id, page = '') => {
  return axiosInstance
    .get(
      "/videos"
    , {
        params: {
          ...defaultParams,
          id,
          pageToken: page
        }
      })
    .then(res => processVideoData(res, id));
};

export const getClippedVideos = () =>
  axios.get('http://localhost:8000/clipping/');

export const getProcessedVideos = () =>
  axios.get('http://localhost:8000/preprocessor/');

export default axiosInstance;
