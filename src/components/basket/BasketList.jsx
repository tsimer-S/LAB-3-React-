
import React, { useState } from 'react';
import { useBasket } from '../../contexts/BasketContext';
import { Link } from 'react-router-dom';
import './BasketList.css';

const BasketList = () => {
  const { basketItems, removeFromBasket, updateBasketItem, getTotalPrice, getItemCount, clearBasket } = useBasket();
  const [editingItem, setEditingItem] = useState(null);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 0.1) {
      removeFromBasket(id);
      return;
    }
    updateBasketItem(id, { quantity: newQuantity });
  };

  const handleUnitChange = (id, unit) => {
    updateBasketItem(id, { unit });
  };

  const handleDeliveryDateChange = (id, deliveryDate) => {
    updateBasketItem(id, { deliveryDate });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Не указано';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (basketItems.length === 0) {
    return (
      <div className="basket-empty">
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <h2>Ваша корзина пуста</h2>
          <p>Добавьте овощи в корзину, чтобы продолжить покупку</p>
          <Link to="/catalog" className="back-to-catalog">
            Вернуться к каталогу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="basket-container">
      <div className="basket-header">
        <h1>Корзина покупок</h1>
        <div className="basket-summary">
          <span>{getItemCount()} товар(ов) на сумму</span>
          <span className="total-price">{getTotalPrice()} ₽</span>
        </div>
      </div>

      <div className="basket-items">
        {basketItems.map(item => (
          <div key={item.id} className="basket-item">
            <div className="item-info">
              <h3>{item.title}</h3>
              <p className="item-category">{item.category}</p>
              
              {editingItem === item.id ? (
                <div className="item-edit-form">
                  <div className="form-group">
                    <label>Количество:</label>
                    <div className="quantity-controls">
                      <input
                        type="number"
                        min="0.1"
                        max="50"
                        step="0.1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseFloat(e.target.value))}
                      />
                      <select
                        value={item.unit}
                        onChange={(e) => handleUnitChange(item.id, e.target.value)}
                      >
                        <option value="кг">кг</option>
                        <option value="г">г</option>
                        <option value="шт">шт</option>
                        <option value="уп">уп</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Дата доставки:</label>
                    <input
                      type="date"
                      value={item.deliveryDate ? item.deliveryDate.slice(0, 10) : ''}
                      onChange={(e) => handleDeliveryDateChange(item.id, e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <button 
                    className="save-btn"
                    onClick={() => setEditingItem(null)}
                  >
                    Сохранить
                  </button>
                </div>
              ) : (
                <div className="item-details">
                  <p><strong>Количество:</strong> {item.quantity} {item.unit}</p>
                  <p><strong>Дата доставки:</strong> {formatDate(item.deliveryDate)}</p>
                  <p><strong>Категория:</strong> {item.category}</p>
                  <p><strong>Цена за {item.unit}:</strong> {item.price} ₽</p>
                  <p className="item-total"><strong>Итого:</strong> {item.totalPrice} ₽</p>
                </div>
              )}
            </div>
            
            <div className="item-actions">
              {editingItem !== item.id && (
                <button 
                  className="edit-btn"
                  onClick={() => setEditingItem(item.id)}
                >
                  ✏️ Редактировать
                </button>
              )}
              <button 
                className="remove-btn"
                onClick={() => removeFromBasket(item.id)}
              >
                🗑️ Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="basket-footer">
        <div className="footer-actions">
          <button 
            className="clear-btn"
            onClick={clearBasket}
          >
            Очистить корзину
          </button>
          <Link to="/catalog" className="continue-shopping">
            Продолжить покупки
          </Link>
        </div>
        
        <div className="checkout-section">
          <div className="order-summary">
            <h3>Итого к оплате</h3>
            <div className="summary-row">
              <span>Товары ({getItemCount()}):</span>
              <span>{getTotalPrice()} ₽</span>
            </div>
            <div className="summary-row">
              <span>Доставка:</span>
              <span>Бесплатно</span>
            </div>
            <div className="summary-row total">
              <span>Общая сумма:</span>
              <span>{getTotalPrice()} ₽</span>
            </div>
          </div>
          
          <Link to="/create-order" className="checkout-btn">
            Оформить заказ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BasketList;
