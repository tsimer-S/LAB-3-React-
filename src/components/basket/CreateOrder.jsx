
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBasket } from '../../contexts/BasketContext';
import './CreateOrder.css';

const CreateOrder = () => {
  const navigate = useNavigate();
  const { basketItems, getTotalPrice, createOrder, clearBasket } = useBasket();
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    deliveryAddress: '',
    deliveryDate: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Введите имя';
    }
    
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Введите корректный email';
    }
    
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Введите телефон';
    }
    
    if (!formData.deliveryDate.trim()) {
      newErrors.deliveryDate = 'Выберите дату доставки';
    }
    
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Введите номер карты';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Номер карты должен содержать 16 цифр';
      }
      
      if (!formData.cardExpiry.trim()) {
        newErrors.cardExpiry = 'Введите срок действия';
      }
      
      if (!formData.cardCVC.trim()) {
        newErrors.cardCVC = 'Введите CVC код';
      } else if (!/^\d{3}$/.test(formData.cardCVC)) {
        newErrors.cardCVC = 'CVC код должен содержать 3 цифры';
      }
    }
    
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
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const orderData = {
        ...formData,
        cardLastFour: formData.cardNumber.slice(-4),
        deliveryDate: formData.deliveryDate
      };
      
      const newOrder = createOrder(orderData);
      
      navigate(`/order/${newOrder.id}`);
      
    } catch (error) {
      console.error('Ошибка при создании заказа:', error);
      alert('Произошла ошибка при создании заказа. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const formatCardNumber = (value) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = formatCardNumber(value);
    handleInputChange({ target: { name: 'cardNumber', value: formatted } });
  };

  if (basketItems.length === 0) {
    return (
      <div className="empty-basket">
        <h2>Ваша корзина пуста</h2>
        <p>Добавьте овощи в корзину, чтобы оформить заказ.</p>
        <button onClick={() => navigate('/catalog')} className="back-btn">
          Перейти в каталог овощей
        </button>
      </div>
    );
  }

  return (
    <div className="create-order-container">
      <div className="order-header">
        <h1>Оформление заказа овощей</h1>
        <div className="order-steps">
          <div className="step active">1. Корзина</div>
          <div className="step active">2. Оформление</div>
          <div className="step">3. Подтверждение</div>
        </div>
      </div>

      <div className="order-content">
        <div className="order-form-section">
          <form onSubmit={handleSubmit} className="order-form">
            <div className="form-section">
              <h2>Контактная информация</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="customerName">Имя и фамилия *</label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder="Иван Иванов"
                    className={errors.customerName ? 'error' : ''}
                  />
                  {errors.customerName && (
                    <span className="error-message">{errors.customerName}</span>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="customerEmail">Email *</label>
                  <input
                    type="email"
                    id="customerEmail"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    placeholder="example@gmail.com"
                    className={errors.customerEmail ? 'error' : ''}
                  />
                  {errors.customerEmail && (
                    <span className="error-message">{errors.customerEmail}</span>
                  )}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="customerPhone">Телефон *</label>
                <input
                  type="tel"
                  id="customerPhone"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  placeholder="+7 (123) 456-78-90"
                  className={errors.customerPhone ? 'error' : ''}
                />
                {errors.customerPhone && (
                  <span className="error-message">{errors.customerPhone}</span>
                )}
              </div>
            </div>

            <div className="form-section">
              <h2>Доставка</h2>
              <div className="form-group">
                <label htmlFor="deliveryAddress">Адрес доставки *</label>
                <textarea
                  id="deliveryAddress"
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleInputChange}
                  placeholder="Улица, дом, квартира, подъезд, этаж"
                  rows="3"
                  className={errors.deliveryAddress ? 'error' : ''}
                />
                {errors.deliveryAddress && (
                  <span className="error-message">{errors.deliveryAddress}</span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="deliveryDate">Дата доставки *</label>
                <input
                  type="date"
                  id="deliveryDate"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  max={new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0]}
                  className={errors.deliveryDate ? 'error' : ''}
                />
                {errors.deliveryDate && (
                  <span className="error-message">{errors.deliveryDate}</span>
                )}
                <small>Доставка осуществляется в течение 2-14 дней</small>
              </div>
            </div>

            <div className="form-section">
              <h2>Способ оплаты</h2>
              <div className="payment-methods">
                <label className="payment-method">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                  />
                  <div className="method-content">
                    <span className="method-icon">💳</span>
                    <span className="method-title">Банковская карта</span>
                  </div>
                </label>
                
                <label className="payment-method">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={formData.paymentMethod === 'online'}
                    onChange={handleInputChange}
                  />
                  <div className="method-content">
                    <span className="method-icon">🌐</span>
                    <span className="method-title">Онлайн оплата</span>
                  </div>
                </label>
                
                <label className="payment-method">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleInputChange}
                  />
                  <div className="method-content">
                    <span className="method-icon">💰</span>
                    <span className="method-title">Наличные при получении</span>
                  </div>
                </label>
              </div>
              
              {formData.paymentMethod === 'card' && (
                <div className="card-details">
                  <div className="form-group">
                    <label htmlFor="cardNumber">Номер карты *</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className={errors.cardNumber ? 'error' : ''}
                    />
                    {errors.cardNumber && (
                      <span className="error-message">{errors.cardNumber}</span>
                    )}
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="cardExpiry">Срок действия *</label>
                      <input
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        className={errors.cardExpiry ? 'error' : ''}
                      />
                      {errors.cardExpiry && (
                        <span className="error-message">{errors.cardExpiry}</span>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="cardCVC">CVC *</label>
                      <input
                        type="text"
                        id="cardCVC"
                        name="cardCVC"
                        value={formData.cardCVC}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength="3"
                        className={errors.cardCVC ? 'error' : ''}
                      />
                      {errors.cardCVC && (
                        <span className="error-message">{errors.cardCVC}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="form-section">
              <h2>Дополнительная информация</h2>
              <div className="form-group">
                <label htmlFor="notes">Комментарий к заказу</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Особые пожелания по доставке, время, запасной номер телефона..."
                  rows="3"
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="back-btn"
                onClick={() => navigate('/basket')}
              >
                ← Вернуться в корзину
              </button>
              
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Обработка...' : `Оплатить ${getTotalPrice()} ₽`}
              </button>
            </div>
          </form>
        </div>

        <div className="order-summary-section">
          <div className="summary-card">
            <h3>Ваш заказ овощей</h3>
            
            <div className="order-items-preview">
              {basketItems.map(item => (
                <div key={item.id} className="preview-item">
                  <div className="preview-info">
                    <h4>{item.title}</h4>
                    <span>{item.quantity} {item.unit} × {item.price} ₽</span>
                    <small>{item.category}</small>
                  </div>
                  <span className="preview-price">{item.totalPrice} ₽</span>
                </div>
              ))}
            </div>
            
            <div className="summary-total">
              <div className="total-row">
                <span>Итого:</span>
                <span>{getTotalPrice()} ₽</span>
              </div>
              <div className="delivery-info">
                <p>🚚 Доставка: Бесплатно</p>
                <p>📅 Доставка в течение 2-14 дней</p>
              </div>
            </div>
            
            <div className="order-note">
              <p>Нажимая "Оплатить", вы соглашаетесь с условиями покупки свежих овощей</p>
            </div>
          </div>
          
          <div className="secure-payment">
            <div className="secure-icon">🔒</div>
            <div className="secure-info">
              <h4>Безопасная оплата</h4>
              <p>Ваши данные защищены SSL-шифрованием</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
