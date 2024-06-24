import { publicRequest } from '~/utils/httpRequestPetHome';

export const getPets = async (data) => {
    try {
        const response = await publicRequest.get('/pets', { params: data });
        return response;
    } catch (error) {
        return error.response;
    }
};

export const getPetDetailById = async (id) => {
    try {
        const response = await publicRequest.get(`/pets/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};