import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://cors-anywhere.herokuapp.com/https://kay-nine.vercel.app',
  baseURL: 'http://localhost:3030',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});
export default instance;
