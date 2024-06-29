import * as httpRequestPetHome from '~/utils/httpRequestPetHome';

export const getUsers = async (dataQuery, dataBody) => {
    try {
        const response = await httpRequestPetHome.post(
            `/users?start=${dataQuery.start}&limit=${dataQuery.limit}&status=${dataQuery.status}`,
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

export const updateStatusUser = async (id, data) => {
    try {
        const response = await httpRequestPetHome.put(`/users/${id}?status=${data}`);
        return response;
    } catch (error) {
        return error.response;
    }
};
