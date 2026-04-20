import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
    const { isAuthenticated, userData, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const result = await logout();
        if (result.success) {
            navigate('/login');
        }
    };

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
            <Link to="/" className="text-xl font-bold text-slate-800">EasyAuth</Link>
            
            <div className="flex items-center gap-4">
                {isAuthenticated ? (
                    <>
                        <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
                            <User size={18} className="text-slate-600" />
                            <span className="text-sm font-medium text-slate-700">{userData?.username}</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-600">
                            <LogOut size={18} className="mr-2" /> Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <Button variant="ghost" size="sm">Login</Button>
                        </Link>
                        <Link to="/register">
                            <Button size="sm">Sign Up</Button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;