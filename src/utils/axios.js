import axios from 'axios';

const instance = axios.create();

export const defaultInfo = {
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  apiKey: 'AIzaSyAuJEXPVw4ZiQjESoErRngyIDNzj3nKD2g'
};

export const searchVideosKeyword = (keyword, page = '') => {
  console.log(`Send request to Youtube${keyword}`);
  return axios.get(
    `${defaultInfo.baseURL}search?key=${defaultInfo.apiKey}&part=snippet&q=${keyword}&maxResults=20&pageToken=${page}&type=video`
  );
};

export const searchVideosChanID = (id, page = '') => {
  console.log(`Send request to Youtube${id}`);
  return axios.get(
    `${defaultInfo.baseURL}search?key=${defaultInfo.apiKey}&part=snippet&channelId=${id}&maxResults=20&pageToken=${page}&type=video`
  );
};

export

export default instance;
