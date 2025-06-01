'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserContextType {
    isAuthenticated: boolean;
    userProfile: UserProfile | null;
    isAdmin: boolean;
    login: (userData: UserProfile) => void;
    logout: () => void;
}

export interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    zipCode?: string;
    role?: 'user' | 'admin';
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    // Check local storage on client-side only
    useEffect(() => {
        const storedUser = localStorage.getItem('userProfile');
        const storedAuth = localStorage.getItem('isAuthenticated');

        if (storedUser && storedAuth === 'true') {
            try {
                const userData = JSON.parse(storedUser);
                setUserProfile(userData);
                setIsAuthenticated(true);
                setIsAdmin(userData.role === 'admin');
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('userProfile');
                localStorage.removeItem('isAuthenticated');
            }
        }
    }, []);

    const login = (userData: UserProfile) => {
        // Determine role with proper typing
        const role: 'user' | 'admin' = userData.email === 'admin@ceylonroots.com' ? 'admin' : 'user';
        const userWithRole: UserProfile = { ...userData, role };

        setUserProfile(userWithRole);
        setIsAuthenticated(true);
        setIsAdmin(role === 'admin');

        // Only set localStorage on client-side
        if (typeof window !== 'undefined') {
            localStorage.setItem('userProfile', JSON.stringify(userWithRole));
            localStorage.setItem('isAuthenticated', 'true');
        }
    };

    const logout = () => {
        setUserProfile(null);
        setIsAuthenticated(false);
        setIsAdmin(false);

        // Only remove localStorage on client-side
        if (typeof window !== 'undefined') {
            localStorage.removeItem('userProfile');
            localStorage.removeItem('isAuthenticated');
        }
    };

    return (
        <UserContext.Provider value={{ isAuthenticated, userProfile, isAdmin, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};