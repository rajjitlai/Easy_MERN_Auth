import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { sendResetOtp } = useAuthStore();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await sendResetOtp(email);
        setLoading(false);

        if (result.success) {
            toast({ title: "OTP Sent", description: "Password reset code sent to your email." });
            navigate(`/reset-password?email=${encodeURIComponent(email)}`);
        } else {
            toast({ variant: "destructive", title: "Error", description: result.message });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-slate-50 px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="mb-2">
                        <Link to="/login" className="text-sm text-slate-600 flex items-center hover:text-slate-900">
                            <ArrowLeft size={16} className="mr-1" /> Back to Login
                        </Link>
                    </div>
                    <CardTitle className="text-2xl">Forgot Password</CardTitle>
                    <CardDescription>Enter your email address and we'll send you a code to reset your password.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input 
                                id="email" 
                                type="email"
                                placeholder="name@example.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Send Reset Code'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default ForgotPassword;