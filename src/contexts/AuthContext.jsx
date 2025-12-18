import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    const register = async (userData) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const mockUser = {
                id: Date.now(),
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                phone: userData.phone
            };
            
            const mockToken = 'mock-jwt-token-' + Date.now();
            
            localStorage.setItem('token', mockToken);
            localStorage.setItem('user', JSON.stringify(mockUser));
            setUser(mockUser);
            
            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                error: 'Ошибка регистрации' 
            };
        }
    };

    const login = async (email, password) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            if (email === 'demo@example.com' && password === 'password123') {
                const mockUser = {
                    id: 1,
                    firstName: 'Демо',
                    lastName: 'Пользователь',
                    email: email,
                    phone: '+7 (999) 123-45-67'
                };
                
                const mockToken = 'demo-jwt-token';
                
                localStorage.setItem('token', mockToken);
                localStorage.setItem('user', JSON.stringify(mockUser));
                setUser(mockUser);
                
                return { success: true };
            }
            
            return { 
                success: false, 
                error: 'Неверный email или пароль' 
            };
        } catch (error) {
            return { 
                success: false, 
                error: 'Ошибка авторизации' 
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const value = {
        user,
        loading,
        register,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};