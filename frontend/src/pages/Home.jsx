import React from 'react';
import useAuthStore from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Simple Badge component if not added via shadcn
const BadgeComponent = ({ children, variant = "default" }) => {
    const variants = {
        default: "bg-slate-100 text-slate-800",
        success: "bg-green-100 text-green-800",
        destructive: "bg-red-100 text-red-800",
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
            {children}
        </span>
    );
};

const Home = () => {
    const { userData, isAuthenticated, sendVerificationOtp } = useAuthStore();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSendOtp = async () => {
        const result = await sendVerificationOtp();
        if (result.success) {
            toast({ title: "OTP Sent", description: "Verification code sent to your email." });
            navigate('/verify-email');
        } else {
            toast({ variant: "destructive", title: "Error", description: result.message });
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-slate-50 px-4 text-center">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Welcome to EasyAuth</h1>
                <p className="text-lg text-slate-600 mb-8 max-w-md">
                    A secure and simple MERN authentication starter kit with Email Verification and Password Reset.
                </p>
                <div className="flex gap-4">
                    <Button onClick={() => navigate('/login')}>Login</Button>
                    <Button variant="outline" onClick={() => navigate('/register')}>Get Started</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">Dashboard</CardTitle>
                            <CardDescription>Welcome back, {userData?.username}!</CardDescription>
                        </div>
                        {userData?.isAccountVerified ? (
                            <BadgeComponent variant="success">
                                <CheckCircle2 size={14} className="mr-1" /> Verified
                            </BadgeComponent>
                        ) : (
                            <BadgeComponent variant="destructive">
                                <XCircle size={14} className="mr-1" /> Unverified
                            </BadgeComponent>
                        )}
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <h3 className="font-semibold text-slate-800 mb-2">Account Status</h3>
                            <p className="text-slate-600 text-sm">
                                {userData?.isAccountVerified 
                                    ? "Your account is fully verified. You have access to all features." 
                                    : "Your account is not yet verified. Please verify your email to secure your account."}
                            </p>
                        </div>

                        {!userData?.isAccountVerified && (
                            <div className="flex flex-col items-center p-6 border-2 border-dashed border-slate-300 rounded-xl bg-blue-50/50">
                                <Mail className="text-blue-500 mb-3" size={32} />
                                <h4 className="font-medium text-slate-900 mb-1">Verify your email</h4>
                                <p className="text-sm text-slate-500 text-center mb-4">
                                    Click the button below to receive a 6-digit verification code.
                                </p>
                                <Button onClick={handleSendOtp}>Send Verification OTP</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Home;