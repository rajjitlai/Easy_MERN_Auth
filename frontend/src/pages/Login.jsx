import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuthStore();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await login(email, password);
        setLoading(false);

        if (result.success) {
            toast({ title: "Success", description: "Logged in successfully" });
            navigate('/');
        } else {
            toast({ variant: "destructive", title: "Error", description: result.message });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-slate-50 px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>Enter your email and password to access your account.</CardDescription>
                </CardHeader>
                <div className="px-6 pb-2">
                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                        <p className="text-xs font-semibold text-blue-700 uppercase mb-1">Demo Credentials</p>
                        <p className="text-sm text-blue-600">Email: <span className="font-mono font-bold">test@example.com</span></p>
                        <p className="text-sm text-blue-600">Password: <span className="font-mono font-bold">password123</span></p>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                placeholder="name@example.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link to="/forgot-password" size="sm" className="text-sm text-blue-600 hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input 
                                id="password" 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Login'}
                        </Button>
                        <p className="text-sm text-center text-slate-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-blue-600 hover:underline">Sign up</Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default Login;