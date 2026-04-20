import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email') || '';
    
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { resetPassword } = useAuthStore();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await resetPassword(email, otp, newPassword);
        setLoading(false);

        if (result.success) {
            toast({ title: "Success", description: "Password reset successfully. You can now login." });
            navigate('/login');
        } else {
            toast({ variant: "destructive", title: "Error", description: result.message });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-slate-50 px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Reset Password</CardTitle>
                    <CardDescription>Enter the code sent to your email and your new password.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="otp">Verification Code</Label>
                            <Input 
                                id="otp" 
                                placeholder="123456" 
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength={6}
                                required 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input 
                                id="newPassword" 
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required 
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full" disabled={loading || otp.length !== 6}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Reset Password'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default ResetPassword;