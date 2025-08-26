import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';


interface SignupParams {
    username: string;
    password: string;
    email: string;
    baseUrl: string;
}


interface AuthResult {
    loading: boolean;
    error: string;
    success: boolean;
    email?: string;
    signup: (params: SignupParams) => Promise<void>;
    verifyEmail: (params: { token: string; otp: string }) => Promise<void>;
}

export function useAuth(): AuthResult {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState<string | undefined>(undefined);
    const navigate = useNavigate();
    const signup = async ({ username, password, email, baseUrl }: SignupParams) => {
        setLoading(true);
        setError('');
        setSuccess(false);
        setEmail(undefined);
        try {
            const res = await axios.post('http://localhost:3001/api/auth/signup', { username, password, email, baseUrl });
            setSuccess(true);
            setEmail(res.data.email);
            console.log(res);
            if (res.data.success !== true) {
                setError('Signup failed');
                alert('Signup failed');
            } else {
                // alert('Signup successful! Please check your email for verification.');
                toast("Signup successful!", {
                    description: `Please check ${email} for verification.`,
                    action: {
                        label: "Verify e-mail",
                        onClick: () => navigate(`/verifyEmail?token=${res.data.token}`, { state: { email } })
                    },
                    duration: 10000,
                    onAutoClose() {
                        navigate(`/verifyEmail/${res.data.token}`, { state: { email } });
                    },
                })

                setLoading(false);

            }
        } catch (err: unknown) {
            toast("Signup failed", {
                description: `Please try again later.`,
                action: {
                    label: "Close",
                    onClick: () => console.log("Close"),
                },
            });

            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error || 'Signup failed');
            } else {
                setError('Signup failed');
            }
        } finally {
            setLoading(false);
        }
    };
    const verifyEmail = async ({ token, otp }: { token: string; otp: string }) => {
        setLoading(true);
        setError('');
        setSuccess(false);
        try {
            const res = await axios.post('http://localhost:3001/api/auth/verify', { token, otp });
            setSuccess(true);
            console.log(res);
            if (res.data.success !== true) {
                setError('Verification failed');
                alert('Verification failed');
            } else {
                toast("Verification successful", {
                    description: `Your email has been verified successfully.`,
                    action: {
                        label: "Close",
                        onClick: () => navigate('/home'),
                    },
                    onAutoClose() {
                        navigate('/home');
                    }
                });
            }
        } catch (err: unknown) {
            toast("Verification failed", {
                description: `Please try again later.`,
                action: {
                    label: "Close",
                    onClick: () => console.log("Close"),
                },
            });

            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error || 'Verification failed');
            } else {
                setError('Verification failed');
            }
        } finally {
            setLoading(false);
        }
    };
    return { loading, error, success, email, signup, verifyEmail };
}

