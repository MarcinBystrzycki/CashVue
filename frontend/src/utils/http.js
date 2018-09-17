import axios from 'axios';

export const http = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiUrl = (method, params = []) => {
  const origin = 'http://localhost:6060';

  return `${origin}/${method.toLowerCase()}/${params.join('/')}`;
};
