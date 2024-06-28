import * as httpRequestPetHome from '~/utils/httpRequestPetHome';

export const getPets = async (dataQuery, dataBody) => {
    try {
        const response = await httpRequestPetHome.post(
            `/pets?start=${dataQuery.start}&limit=${dataQuery.limit}&status=${dataQuery.status}`,
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

export const getPetDetailById = async (id) => {
    try {
        const response = await httpRequestPetHome.get(`/pets/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const updateStatusPet = async (id, data) => {
    try {
        const response = await httpRequestPetHome.put(`/pets/${id}?status=${data}`);
        return response;
    } catch (error) {
        return error.response;
    }
};
