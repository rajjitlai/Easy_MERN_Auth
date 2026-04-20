import { create } from 'zustand';
import axios from 'axios';

axios.defaults.withCredentials = true;
export const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8282';

// Set this to true to use dummy data without a backend
const MOCK_MODE = true;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const useAuthStore = create((set, get) => ({
    userData: null,
    isAuthenticated: false,
    isAppLoaded: false,

    getIsAuthenticated: () => get().isAuthenticated,
    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    setUserData: (data) => set({ userData: data }),

    checkAuth: async () => {
        if (MOCK_MODE) {
            await sleep(500);
            set({ isAppLoaded: true });
            return;
        }
        try {
            const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
            if (data.success) {
                set({ isAuthenticated: true });
                await get().getUserData();
            }
        } catch (error) {
            console.error("Auth check failed:", error);
        } finally {
            set({ isAppLoaded: true });
        }
    },

    getUserData: async () => {
        if (MOCK_MODE) return;
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/data`);
            if (data.success) {
                set({ userData: data.userData });
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        }
    },

    login: async (email, password) => {
        if (MOCK_MODE) {
            await sleep(1000);
            if (email === 'test@example.com' && password === 'password123') {
                set({ 
                    isAuthenticated: true, 
                    userData: { username: 'Demo User', isAccountVerified: false } 
                });
                return { success: true, message: 'Logged in successfully (Mock)' };
            }
            return { success: false, message: 'Invalid credentials. Use test@example.com / password123' };
        }
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
            if (data.success) {
                set({ isAuthenticated: true });
                await get().getUserData();
            }
            return data;
        } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message };
        }
    },

    register: async (username, email, password) => {
        if (MOCK_MODE) {
            await sleep(1000);
            set({ 
                isAuthenticated: true, 
                userData: { username: username || 'New User', isAccountVerified: false } 
            });
            return { success: true, message: 'Registered successfully (Mock)' };
        }
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/register`, { username, email, password });
            if (data.success) {
                set({ isAuthenticated: true });
                await get().getUserData();
            }
            return data;
        } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message };
        }
    },

    logout: async () => {
        if (MOCK_MODE) {
            set({ isAuthenticated: false, userData: null });
            return { success: true };
        }
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
            if (data.success) {
                set({ isAuthenticated: false, userData: null });
            }
            return data;
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    sendVerificationOtp: async () => {
        if (MOCK_MODE) {
            await sleep(500);
            console.log("Mock OTP sent: 123456");
            return { success: true, message: 'OTP Sent (Mock: 123456)' };
        }
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`);
            return data;
        } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message };
        }
    },

    verifyEmail: async (otp) => {
        if (MOCK_MODE) {
            await sleep(1000);
            if (otp === '123456') {
                const currentData = get().userData;
                set({ userData: { ...currentData, isAccountVerified: true } });
                return { success: true, message: 'Email verified (Mock)' };
            }
            return { success: false, message: 'Invalid OTP. Use 123456' };
        }
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, { otp });
            if (data.success) {
                await get().getUserData();
            }
            return data;
        } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message };
        }
    },

    sendResetOtp: async (email) => {
        if (MOCK_MODE) {
            await sleep(500);
            return { success: true, message: 'Reset OTP sent (Mock)' };
        }
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
            return data;
        } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message };
        }
    },

    resetPassword: async (email, otp, newPassword) => {
        if (MOCK_MODE) {
            await sleep(1000);
            return { success: true, message: 'Password reset successful (Mock)' };
        }
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, { email, otp, newPassword });
            return data;
        } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message };
        }
    }
}));

export default useAuthStore;