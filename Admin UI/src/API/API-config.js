import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://cors-anywhere.herokuapp.com/https://kay-nine.vercel.app',
  baseURL: 'https://kay-va.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});
export default instance;
