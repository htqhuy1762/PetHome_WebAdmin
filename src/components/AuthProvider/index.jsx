import { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const expiredAt = localStorage.getItem('expiredAt');

        const checkLoginStatus = () => {
            if (accessToken && new Date().getTime() < new Date(expiredAt).getTime()) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setIsLoading(false);
        };

        // Check initial login status
        checkLoginStatus();

        // Lắng nghe sự kiện tokenRefreshed
        const handleTokenRefreshed = (event) => {
            setIsLoggedIn(event.detail.isLoggedIn);
        };

        window.addEventListener('tokenRefreshed', handleTokenRefreshed);

        // Dọn dẹp sự kiện khi component unmount
        return () => {
            window.removeEventListener('tokenRefreshed', handleTokenRefreshed);
        };
    }, []);

    return <AuthContext.Provider value={{ isLoggedIn, isLoading, setIsLoggedIn }}>{children}</AuthContext.Provider>;
}
