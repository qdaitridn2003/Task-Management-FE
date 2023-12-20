import axios from 'axios';

import { axiosBaseURL } from '../common';

const axiosInstance = axios.create({
    baseURL: axiosBaseURL,
});

export const axiosGet = async (path, query, configs) => {
    try {
        const result = await axiosInstance.get(path, { params: query, ...configs });
        return result.data;
    } catch (error) {
        console.log('Axios Get Error:', error);
        return error.response
            ? error.response.data
            : { message: 'An error has occurred', status: 'failure' };
    }
};

export const axiosPost = async (path, data, configs) => {
    try {
        const result = await axiosInstance.post(path, data, { ...configs });
        return result.data;
    } catch (error) {
        console.log('Axios Post Error:', error);
        return error.response
            ? error.response.data
            : { message: 'An error has occurred', status: 'failure' };
    }
};

export const axiosPut = async (path, data, configs) => {
    try {
        const result = await axiosInstance.put(path, data, { ...configs });
        return result.data;
    } catch (error) {
        console.log('Axios Post Error:', error);
        return error.response
            ? error.response.data
            : { message: 'An error has occurred', status: 'failure' };
    }
};

export const axiosDelete = async (path, configs) => {
    try {
        const result = await axiosInstance.delete(path, { ...configs });
        return result.data;
    } catch (error) {
        console.log('Axios Post Error:', error);
        return error.response
            ? error.response.data
            : { message: 'An error has occurred', status: 'failure' };
    }
};

export const axiosAuthGet = async (path, query, token, configs) => {
    try {
        const result = await axiosInstance.get(path, {
            params: query,
            headers: { Authorization: `Bearer ${token}` },
            ...configs,
        });
        return result.data;
    } catch (error) {
        console.log('Axios Get Error:', error);
        return error.response
            ? error.response.data
            : { message: 'An error has occurred', status: 'failure' };
    }
};

export const axiosAuthPost = async (path, data, token, configs) => {
    try {
        const result = await axiosInstance.post(path, data, {
            headers: { Authorization: `Bearer ${token}` },
            ...configs,
        });
        return result.data;
    } catch (error) {
        console.log('Axios Get Error:', error);
        return error.response
            ? error.response.data
            : { message: 'An error has occurred', status: 'failure' };
    }
};

export const axiosAuthPut = async (path, data, token, configs) => {
    try {
        const result = await axiosInstance.put(path, data, {
            headers: { Authorization: `Bearer ${token}` },
            ...configs,
        });
        return result.data;
    } catch (error) {
        console.log('Axios Get Error:', error);
        return error.response
            ? error.response.data
            : { message: 'An error has occurred', status: 'failure' };
    }
};

export const axiosAuthDelete = async (path, token, configs) => {
    try {
        const result = await axiosInstance.delete(path, {
            headers: { Authorization: `Bearer ${token}` },
            ...configs,
        });
        return result.data;
    } catch (error) {
        console.log('Axios Get Error:', error);
        return error.response
            ? error.response.data
            : { message: 'An error has occurred', status: 'failure' };
    }
};
