import * as httpRequestPetHome from '~/utils/httpRequestPetHome';

export const getPets = async (data) => {
    try {
        const response = await httpRequestPetHome.get('/pets', { params: data });
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
}