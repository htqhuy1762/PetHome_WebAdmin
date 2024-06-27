import * as httpRequestPetHome from '~/utils/httpRequestPetHome';

export const getShops = async (data) => {
    try {
        const response = await httpRequestPetHome.get('/shops', { params: data });
        return response;
    } catch (error) {
        return error.response;
    }
};

export const updateStatusShop = async (id, data) => {
    try {
        const response = await httpRequestPetHome.put(`/shops/${id}?status=${data}`);
        return response;
    } catch (error) {
        return error.response;
    }
}