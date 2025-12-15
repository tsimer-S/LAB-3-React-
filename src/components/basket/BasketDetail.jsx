
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBasket } from '../../contexts/BasketContext';
import './BasketDetail.css';

const BasketDetail = () => {
  const { orderId } = useParams();
  const { orders } = useBasket();
  
  const order = orders.find(o => o.id === parseInt(orderId));
  
  if (!order) {
    return (
      <div className="order-not-found">
        <h2>Заказ не найден</h2>
        <p>Извините, запрашиваемый заказ не существует.</p>
        <Link to="/orders" className="back-link">
          Вернуться к заказам
        </Link>
      </div>
    );
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ff9800';
      case 'processing': return '#2196f3';
      case 'completed': return '#4caf50';
      case 'cancelled': return '#f44336';
      case 'delivered': return '#8bc34a';
      default: return '#666';
    }
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Ожидает оплаты';
      case 'processing': return 'В обработке';
      case 'completed': return 'Завершен';
      case 'cancelled': return 'Отменен';
      case 'delivered': return 'Доставлен';
      default: return status;
    }
  };

  return (
    <div className="order-detail-container">
      <div className="order-header">
        <div className="header-info">
          <h1>Заказ овощей №{order.orderNumber}</h1>
          <div className="order-meta">
            <span className="order-date">Создан: {formatDate(order.date)}</span>
            <span 
              className="order-status"
              style={{ backgroundColor: getStatusColor(order.status) }}
            >
              {getStatusText(order.status)}
            </span>
          </div>
        </div>
        <Link to="/orders" className="back-btn">
          ← Назад к заказам
        </Link>
      </div>
      
      <div className="order-content">
        <div className="order-items-section">
          <h2>Детали заказа</h2>
          <div className="order-items">
            {order.items.map(item => (
              <div key={item.id} className="order-item">
                <div className="item-header">
                  <h3>{item.title}</h3>
                  <span className="item-price">{item.totalPrice} ₽</span>
                </div>
                <div className="item-details">
                  <p><strong>Количество:</strong> {item.quantity} {item.unit}</p>
                  <p><strong>Категория:</strong> {item.category}</p>
                  <p><strong>Цена за {item.unit}:</strong> {item.price} ₽</p>
                  {item.deliveryDate && (
                    <p><strong>Дата доставки:</strong> {new Date(item.deliveryDate).toLocaleDateString('ru-RU')}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="order-summary-section">
          <div className="summary-card">
            <h3>Информация о заказе</h3>
            
            <div className="summary-group">
              <h4>Детали оплаты</h4>
              <div className="summary-row">
                <span>Способ оплаты:</span>
                <span>
                  {order.paymentMethod === 'card' ? 'Банковская карта' : 
                   order.paymentMethod === 'cash' ? 'Наличные при получении' : 
                   order.paymentMethod === 'online' ? 'Онлайн оплата' : 
                   order.paymentMethod}
                </span>
              </div>
              {order.paymentMethod === 'card' && (
                <div className="summary-row">
                  <span>Номер карты:</span>
                  <span>**** **** **** {order.cardLastFour || '1234'}</span>
                </div>
              )}
            </div>
            
            <div className="summary-group">
              <h4>Контактная информация</h4>
              <div className="summary-row">
                <span>Имя:</span>
                <span>{order.customerName || 'Иван Иванов'}</span>
              </div>
              <div className="summary-row">
                <span>Email:</span>
                <span>{order.customerEmail || 'ivan@example.com'}</span>
              </div>
              <div className="summary-row">
                <span>Телефон:</span>
                <span>{order.customerPhone || '+7 (123) 456-78-90'}</span>
              </div>
              {order.deliveryAddress && (
                <div className="summary-row">
                  <span>Адрес доставки:</span>
                  <span>{order.deliveryAddress}</span>
                </div>
              )}
            </div>
            
            <div className="summary-group">
              <h4>Итоговая сумма</h4>
              <div className="summary-row">
                <span>Сумма заказа:</span>
                <span>{order.totalAmount} ₽</span>
              </div>
              <div className="summary-row">
                <span>Скидка:</span>
                <span>{order.discount || 0} ₽</span>
              </div>
              <div className="summary-row">
                <span>Доставка:</span>
                <span>{order.shippingCost || 'Бесплатно'}</span>
              </div>
              <div className="summary-row total">
                <span>Итого к оплате:</span>
                <span>{order.totalAmount} ₽</span>
              </div>
            </div>
          </div>
          
          <div className="order-actions">
            <Link 
              to={`/update-order/${order.id}`}
              className="action-btn edit-btn"
            >
              Редактировать заказ
            </Link>
            {order.status === 'pending' && (
              <button className="action-btn cancel-btn">
                Отменить заказ
              </button>
            )}
            <button className="action-btn print-btn">
              Печать чека
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketDetail;
