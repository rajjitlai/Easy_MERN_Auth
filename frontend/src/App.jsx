import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import VerifyEmail from '@/pages/VerifyEmail';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import { Toaster } from '@/components/ui/toaster';
import { Loader2 } from 'lucide-react';

const App = () => {
    const { checkAuth, isAppLoaded, isAuthenticated } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (!isAppLoaded) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans antialiased">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route 
                    path="/login" 
                    element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
                />
                <Route 
                    path="/register" 
                    element={isAuthenticated ? <Navigate to="/" /> : <Register />} 
                />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
            <Toaster />
        </div>
    );
};

export default App;