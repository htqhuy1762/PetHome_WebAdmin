import axios from 'axios';

const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL_AUTH,
    withCredentials: true,
});

export const get = async (path, option = {}) => {
    const response = await request.get(path, option);
    return response;
};

export const post = async (path, data, option = {}) => {
    const response = await request.post(path, data, option);
    return response;
}

export const put = async (path, data, option = {}) => {
    const response = await request.put(path, data, option);
    return response;
}

export const del = async (path, option = {}) => {
    const response = await request.delete(path, option);
    return response;
}

export default request;