import * as httpRequestPetHome from '~/utils/httpRequestPetHome';

export const getItems = async (dataQuery, dataBody) => {
    try {
        const response = await httpRequestPetHome.post(
            `/items?start=${dataQuery.start}&limit=${dataQuery.limit}&status=${dataQuery.status}`,
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

export const getItemDetailById = async (id) => {
    try {
        const response = await httpRequestPetHome.get(`/items/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const updateStatusItem = async (id, data) => {
    try {
        const response = await httpRequestPetHome.put(`/items/${id}?status=${data}`);
        return response;
    } catch (error) {
        return error.response;
    }
};
