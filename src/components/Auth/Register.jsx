import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        dateOfBirth: ''
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.firstName.trim()) newErrors.firstName = 'Имя обязательно';
        if (!formData.lastName.trim()) newErrors.lastName = 'Фамилия обязательна';
        if (!formData.email.trim()) newErrors.email = 'Email обязателен';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Некорректный email';
        
        if (!formData.password) newErrors.password = 'Пароль обязателен';
        else if (formData.password.length < 6) newErrors.password = 'Пароль должен быть минимум 6 символов';
        
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Пароли не совпадают';
        }
        
        if (!formData.phone.trim()) newErrors.phone = 'Телефон обязателен';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Дата рождения обязательна';
        
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        setIsSubmitting(true);
        
        const userData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            dateOfBirth: formData.dateOfBirth
        };
        
        const result = await register(userData);
        
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
                <h2>Создать аккаунт</h2>
                <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
            </div>
            
            <form className="auth-form" onSubmit={handleSubmit}>
                {errors.submit && (
                    <div className="error-message" style={{color: '#f44336', marginBottom: '15px'}}>
                        {errors.submit}
                    </div>
                )}
                
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="firstName">Имя *</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            className={errors.firstName ? 'error' : ''}
                            placeholder="Введите имя"
                        />
                        {errors.firstName && (
                            <p className="error-message">{errors.firstName}</p>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="lastName">Фамилия *</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            className={errors.lastName ? 'error' : ''}
                            placeholder="Введите фамилию"
                        />
                        {errors.lastName && (
                            <p className="error-message">{errors.lastName}</p>
                        )}
                    </div>
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">Email *</label>
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
                    {errors.email && (
                        <p className="error-message">{errors.email}</p>
                    )}
                </div>
                
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="password">Пароль *</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'error' : ''}
                            placeholder="Минимум 6 символов"
                        />
                        {errors.password && (
                            <p className="error-message">{errors.password}</p>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Подтвердите пароль *</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? 'error' : ''}
                            placeholder="Повторите пароль"
                        />
                        {errors.confirmPassword && (
                            <p className="error-message">{errors.confirmPassword}</p>
                        )}
                    </div>
                </div>
                
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="phone">Телефон *</label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className={errors.phone ? 'error' : ''}
                            placeholder="+7 (999) 999-99-99"
                        />
                        {errors.phone && (
                            <p className="error-message">{errors.phone}</p>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Дата рождения *</label>
                        <input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            required
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className={errors.dateOfBirth ? 'error' : ''}
                        />
                        {errors.dateOfBirth && (
                            <p className="error-message">{errors.dateOfBirth}</p>
                        )}
                    </div>
                </div>
                
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="auth-btn"
                >
                    {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>
            </form>
        </div>
    );
};

export default Register;