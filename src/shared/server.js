import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://autoezserver.appspot.com'
  baseURL: 'http://localhost:4000/'

});

export default instance;