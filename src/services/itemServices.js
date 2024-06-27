import * as httpRequestPetHome from '~/utils/httpRequestPetHome';

export const getItems = async (data) => {
    try {
        const response = await httpRequestPetHome.get('/items', { params: data });
        return response;
    } catch (error) {
        return error.response;
    }
};

export const getItemDetailById = async (id) => {
    try {
        const response = await httpRequestPetHome.get(`/items/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const updateStatusItem = async (id, dataStatus, dataSearch) => {
    try {
        const response = await httpRequestPetHome.put(`/items/${id}?status=${dataStatus}&search=${dataSearch}`);
        return response;
    } catch (error) {
        return error.response;
    }
}