import axios from 'axios';

import accessToken from './jwt-token-access/accessToken';

//apply base url for axios
// const API_URL = process.env.REACT_APP_SERVER_URL

export const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000/api';

// export const API_URL =
//   process.env.REACT_APP_SERVER_URL || "http://localhost:4000/api"
const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.defaults.headers.common['Authorization'] = accessToken.header;

accessToken.onUpdate(() => {
  axiosApi.defaults.headers.common['Authorization'] = accessToken.header;
});

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location = '/login';
      localStorage.removeItem('authUser');
      sessionStorage.removeItem('authUser');
    }
    throw error;
  },
);

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then((response) => response.data);
}

export async function getImage(url, config = {}) {
  return await axiosApi
    .get(url, {
      ...config,
      responseType: 'blob',
    })
    .then((response) => response.data);
}

export async function postFormData(url, data, config = {}) {
  return axiosApi.post(url, data, { ...config }).then((response) => response);
}

export async function post(url, data, config = {}) {
  return axiosApi.post(url, { ...data }, { ...config }).then((response) => response);
}

export async function put(url, data, config = {}) {
  return axiosApi.put(url, { ...data }, { ...config }).then((response) => response);
}

export async function patch(url, data, config = {}) {
  return axiosApi.patch(url, { ...data }, { ...config }).then((response) => response);
}

export async function del(url, config = {}) {
  return await axiosApi.delete(url, { ...config }).then((response) => response);
}
