import * as httpRequestPetHome from '~/utils/httpRequestPetHome';

export const getBills = async (dataQuery) => {
    try {
        const response = await httpRequestPetHome.get(
            `/bills?start=${dataQuery.start}&limit=${dataQuery.limit}&admin_paid='${dataQuery.admin_paid}'`,
        );
        return response;
    } catch (error) {
        return error.response;
    }
};

export const getBillsByShop = async (idShop, dataQuery) => {
    try {
        const response = await httpRequestPetHome.get(
            `/shop/${idShop}/bills?start=${dataQuery.start}&limit=${dataQuery.limit}&admin_paid='${dataQuery.admin_paid}'`,
        );
        return response;
    } catch (error) {
        return error.response;
    }
}


export const updateAdminPaidBill = async (idBill, paid_status) => {
    try {
        const response = await httpRequestPetHome.put(`/bills/${idBill}?admin_paid=${paid_status}`);
        return response;
    } catch (error) {
        return error.response;
    }
}