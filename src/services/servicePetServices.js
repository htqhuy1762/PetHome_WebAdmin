import * as httpRequestPetHome from '~/utils/httpRequestPetHome';

export const getServices = async (dataQuery, dataBody) => {
    try {
        const response = await httpRequestPetHome.post(
            `/services?start=${dataQuery.start}&limit=${dataQuery.limit}&status=${dataQuery.status}`,
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

export const getServiceDetailById = async (id) => {
    try {
        const response = await httpRequestPetHome.get(`/services/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const updateStatusService = async (id, data) => {
    try {
        const response = await httpRequestPetHome.put(`/services/${id}?status=${data}`);
        return response;
    } catch (error) {
        return error.response;
    }
}