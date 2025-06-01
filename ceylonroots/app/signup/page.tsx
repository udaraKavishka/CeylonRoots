'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { useToast } from "../components/ui/use-toast";
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
import { User, Mail, Lock, UserPlus, AlertCircle } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const Signup = () => {
    // Pre-filled demo credentials
    const [fullName, setFullName] = useState('Demo User');
    const [email, setEmail] = useState('signup@ceylonroots.com');
    const [password, setPassword] = useState('signup123');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const { login } = useUser();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // For demo purposes - simulate signup
        setTimeout(() => {
            setIsLoading(false);

            // Split the full name into first name and last name
            const nameParts = fullName.split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';

            // Login the user after successful signup
            login({
                firstName,
                lastName,
                email,
                phone: "",
                address: "",
                city: "",
                country: "",
                zipCode: ""
            });

            toast({
                title: "Account created",
                description: "Welcome to CeylonRoots! Your account has been created successfully.",
            });
            router.push('/');
        }, 1500);
    };

    const handleGoogleSignup = () => {
        setIsLoading(true);

        // Simulate Google signup
        setTimeout(() => {
            login({
                firstName: "Google",
                lastName: "User",
                email: "google.user@example.com",
                phone: "",
                address: "",
                city: "",
                country: "",
                zipCode: ""
            });

            setIsLoading(false);
            toast({
                title: "Google Sign Up",
                description: "Account created successfully with Google!",
            });
            router.push('/');
        }, 1000);
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* <Navbar /> */}

            <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 hero-pattern mt-10">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
                        <CardDescription className="text-center">
                            Enter your details to create your CeylonRoots account
                        </CardDescription>
                        <div className="bg-amber-100 border border-amber-300 text-amber-800 px-4 py-3 rounded relative" role="alert">
                            <div className="flex items-center">
                                <AlertCircle className="h-4 w-4 mr-2" />
                                <span className="font-medium">Demo Credentials:</span>
                            </div>
                            <p className="text-sm mt-1">Name: Demo User</p>
                            <p className="text-sm">Email: signup@ceylonroots.com</p>
                            <p className="text-sm">Password: signup123</p>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSignup} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="fullName"
                                        type="text"
                                        placeholder="John Doe"
                                        className="pl-10"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your.email@example.com"
                                        className="pl-10"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Password must be at least 8 characters long and include a number and a special character.
                                </p>
                            </div>

                            <Button type="submit" className="w-full ceylon-button-primary" disabled={isLoading}>
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating account...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center">
                                        <UserPlus className="mr-2 h-5 w-5" />
                                        Sign Up
                                    </span>
                                )}
                            </Button>
                        </form>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <Separator />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>

                        <Button variant="outline" type="button" className="w-full" onClick={handleGoogleSignup}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                                <path d="M18.657 10.5c0-.6-.057-1.193-.166-1.768H12v3.293h3.86c-.165.934-.665 1.72-1.415 2.25v1.876h2.287c1.34-1.234 2.117-3.047 2.117-5.15z" fill="#4285F4"></path>
                                <path d="M12 19c1.912 0 3.517-.626 4.687-1.686l-2.287-1.875c-.635.42-1.45.675-2.4.675-1.848 0-3.407-1.245-3.967-2.92H5.693v1.94C6.855 17.52 9.243 19 12 19z" fill="#34A853"></path>
                                <path d="M8.033 13.192c-.143-.427-.22-.877-.22-1.344 0-.466.077-.917.22-1.344V8.565H5.693c-.452.903-.72 1.92-.72 3.001s.268 2.098.72 3.001l2.34-1.375z" fill="#FBBC05"></path>
                                <path d="M12 7.58c1.043 0 1.978.357 2.712 1.06l2.027-2.027C15.556 5.517 13.95 4.79 12 4.79c-3.172 0-5.843 1.81-7.165 4.457l2.34 1.375c.56-1.674 2.12-2.919 3.967-2.919z" fill="#EA4335"></path>
                            </svg>
                            Continue with Google
                        </Button>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                        <div className="text-sm text-center">
                            Already have an account?{' '}
                            <Link href="/login" className="text-ceylon-tea hover:underline font-medium">
                                Log in
                            </Link>
                        </div>

                        <div className="text-xs text-center text-muted-foreground">
                            By signing up, you agree to our{' '}
                            <Link href="/terms" className="text-ceylon-tea hover:underline">
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link href="/privacy" className="text-ceylon-tea hover:underline">
                                Privacy Policy
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </main>

            {/* <Footer /> */}
        </div>
    );
};

export default Signup;