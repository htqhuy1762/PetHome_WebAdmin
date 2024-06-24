import axios from 'axios';
import * as authServices from '~/services/authServices';

// Instance cho các request có xác thực
const authRequest = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL_PETHOME,
});

const publicRequest = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL_PETHOME,
});

// Request interceptor để thêm token vào mỗi request authRequest
authRequest.interceptors.request.use(
    async (config) => {
        // Gọi hàm authorizeToken trước mỗi request
        await authorizeToken();

        // Thêm token vào header Authorization
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = accessToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Hàm authorizeToken để kiểm tra token và xử lý kết quả
const authorizeToken = async () => {
    try {
        const response = await authServices.authorizeToken();
        // Nếu authorizeToken trả về status 200, không cần làm gì cả, tiếp tục thực hiện request với token hiện tại
        if (response.status === 200) {
            return response;
        } else {
            await refreshToken();
            return response;
        }
    } catch (error) {
        console.log('Error during authorization:', error);
        throw error;
    }
};

// Hàm refreshToken để làm mới token
const refreshToken = async () => {
    try {
        const response = await authServices.getNewAccessToken();
        if (response.status === 200) {
            console.log('Refresh token successfully:', response);
            // Nếu refreshToken thành công, lưu token mới và tiếp tục thực hiện request với token mới
            const newAccessToken = response.data.accessToken;
            const expiryTime = response.data.expiredAt;
            const newRefreshToken = response.data.refreshToken;
            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('expiredAt', expiryTime);
            localStorage.setItem('refreshToken', newRefreshToken);

            const event = new CustomEvent('tokenRefreshed', { detail: { isLoggedIn: true } });
            window.dispatchEvent(event);
        } else {
            // Xử lý lỗi nếu refreshToken không thành công
            console.log('Error refreshing token:', response);
            throw new Error('Error refreshing token');
        }
    } catch (error) {
        console.log('Error refreshing token:', error);
        throw error;
    }
};

export { authRequest, publicRequest };