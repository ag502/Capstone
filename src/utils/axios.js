import axios from 'axios';

const instance = axios.create();

export const defaultInfo = {
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  apiKey: 'AIzaSyDOA7d2cH7InnpkA2sDJ_hGJesmNrH_AWc',
};

export const searchKeyword = (keyword, page = '') => {
  return axios.get(`${defaultInfo.baseURL}search?key=${defaultInfo.apiKey}&part=snippet&q=${keyword}&maxResults=20&pageToken=${page}&type=video`);
};

export default instance;
