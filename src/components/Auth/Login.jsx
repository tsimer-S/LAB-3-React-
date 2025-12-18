import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const [formData, setFormData] = useState({
        email: 'demo@example.com',
        password: 'password123'
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.email.trim() || !formData.password) {
            setErrors({
                submit: 'Пожалуйста, заполните все поля'
            });
            return;
        }
        
        setIsSubmitting(true);
        
        const result = await login(formData.email, formData.password);
        
        if (result.success) {
            navigate('/');
        } else {
            setErrors({ submit: result.error });
        }
        
        setIsSubmitting(false);
    };

    return (
        <div className="auth-container">
            <div className="auth-header">
                <h2>Вход в аккаунт</h2>
                <p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
            </div>
            
            <form onSubmit={handleSubmit} className="auth-form">
                {errors.submit && (
                    <div className="error-message" style={{color: '#f44336', marginBottom: '15px'}}>
                        {errors.submit}
                    </div>
                )}
                
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                        placeholder="example@mail.com"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Пароль</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Введите пароль"
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="auth-btn"
                >
                    {isSubmitting ? 'Вход...' : 'Войти'}
                </button>
            </form>
            
            <div className="auth-link">
                <p>Демо доступ: demo@example.com / password123</p>
            </div>
        </div>
    );
};

export default Login;