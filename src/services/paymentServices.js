import * as httpRequestPetHome from '~/utils/httpRequestPetHome';

export const getPayments = async () => {
    try {
        const response = await httpRequestPetHome.get('/payment_method');
        return response;
    } catch (error) {
        return error.response;
    }
};

export const updateStatusPayment = async (id, data) => {
    try {
        const response = await httpRequestPetHome.put(`/payment_method/${id}?status=${data}`);
        return response;
    } catch (error) {
        return error.response;
    }
};
