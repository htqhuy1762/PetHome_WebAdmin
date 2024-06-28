import * as httpRequestPetHome from '~/utils/httpRequestPetHome';

export const getShops = async (dataQuery, dataBody) => {
    try {
        const response = await httpRequestPetHome.post(
            `/shops?start=${dataQuery.start}&limit=${dataQuery.limit}&status=${dataQuery.status}`,
            dataBody,
            {
                Headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
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
};
