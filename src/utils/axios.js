import axios from 'axios';

const instance = axios.create();

export const defaultInfo = {
  baseURL: 'https://www.googleapis.com/youtube/v3/',
<<<<<<< HEAD
  // apiKey: 'AIzaSyAuJEXPVw4ZiQjESoErRngyIDNzj3nKD2g'
  apiKey: 'AIzaSyAwto5LXP7NT5sloIpmkd6DRiyb7XMTjc4'
=======
  apiKey: 'AIzaSyAdQ6rATxPvzElZFkGWP_3oSvonJfkBxw8'
>>>>>>> 076f636fc87e28372d9c2711b92be055a02464af
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

export const searchVideosID = (id, page = '') => {
  console.log(`Send request to Youtube${id}`);
  return axios.get(
    `${defaultInfo.baseURL}videos?key=${defaultInfo.apiKey}&part=snippet&id=${id}&maxResults=20&pageToken=${page}`
  );
};

export default instance;
