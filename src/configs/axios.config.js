import axios from 'axios';

import { axiosBaseURL } from '../common';

const axiosInstance = axios.create({
  baseURL: axiosBaseURL,
});

export const axiosGet = async (path, query, config) => {
  try {
    const result = await axiosInstance.get(path, { ...config, params: query });
    return result.data.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      console.log('Axios Error:', error.message);
      return { message: 'An error has occurred', status: 'failure' };
    }
  }
};

export const axiosPost = async (path, data, config) => {
  try {
    const result = await axiosInstance.post(path, data, { ...config });
    return result.data.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      console.log('Axios Error:', error.message);
      return { message: 'An error has occurred', status: 'failure' };
    }
  }
};

export const axiosPut = async (path, data, config) => {
  try {
    const result = await axiosInstance.put(path, data, { ...config });
    return result.data.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      console.log('Axios Error:', error.message);
      return { message: 'An error has occurred', status: 'failure' };
    }
  }
};

export const axiosDel = async (path, query, config) => {
  try {
    const result = await axiosInstance.delete(path, { ...config, params: query });
    return result.data.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      console.log('Axios Error:', error.message);
      return { message: 'An error has occurred', status: 'failure' };
    }
  }
};

export const axiosAuthGet = async (path, accessToken, query, config) => {
  try {
    const result = await axiosInstance.get(path, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: query,
      ...config,
    });
    return result.data.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      console.log('Axios Error:', error.message);
      return { message: 'An error has occurred', status: 'failure' };
    }
  }
};

export const axiosAuthPost = async (path, accessToken, data, config) => {
  try {
    const result = await axiosInstance.post(path, data, {
      headers: { Authorization: `Bearer ${accessToken}` },

      ...config,
    });
    return result.data.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      console.log('Axios Error:', error.message);
      return { message: 'An error has occurred', status: 'failure' };
    }
  }
};

export const axiosAuthPut = async (path, accessToken, data, config) => {
  try {
    const result = await axiosInstance.put(path, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
      ...config,
    });
    return result.data.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      console.log('Axios Error:', error.message);
      return { message: 'An error has occurred', status: 'failure' };
    }
  }
};

export const axiosAuthDel = async (path, accessToken, query, config) => {
  try {
    const result = await axiosInstance.delete(path, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: query,
      ...config,
    });
    return result.data.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      console.log('Axios Error:', error.message);
      return { message: 'An error has occurred', status: 'failure' };
    }
  }
};
