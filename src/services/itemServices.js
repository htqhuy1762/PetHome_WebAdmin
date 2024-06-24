import { publicRequest } from '~/utils/httpRequestPetHome';

export const getItems = async (data) => {
    try {
        const response = await publicRequest.get('/items', { params: data });
        return response;
    } catch (error) {
        return error.response;
    }
};

export const getItemDetailById = async (id) => {
    try {
        const response = await publicRequest.get(`/items/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};