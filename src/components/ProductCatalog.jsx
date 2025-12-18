
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBasket } from '../contexts/BasketContext';
import productData from '../ProductData';
import './ProductCatalog.css';

const ProductCatalog = () => {
  const navigate = useNavigate();
  const { addToBasket } = useBasket();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('кг');
  const [deliveryDate, setDeliveryDate] = useState('');

  const handleAddToBasket = (product) => {
    setSelectedProduct(product);
    
    // Устанавливаем дату доставки по умолчанию (через 2 дня)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    setDeliveryDate(tomorrow.toISOString().split('T')[0]);
    
    // Устанавливаем количество по умолчанию
    setQuantity(1);
    setUnit('кг');
    
    setShowModal(true);
  };

  const handleConfirmAdd = () => {
    if (!selectedProduct) return;
    
    addToBasket(selectedProduct, quantity, unit, deliveryDate);
    
    setShowModal(false);
    setSelectedProduct(null);
    setQuantity(1);
    
    alert(`${selectedProduct.title} добавлен в корзину!`);
  };

  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <h1>Каталог свежих овощей</h1>
        <div className="catalog-stats">
          <span>{productData.length} видов овощей доступно</span>
          <button 
            className="view-basket-btn"
            onClick={() => navigate('/basket')}
          >
            Перейти в корзину
          </button>
        </div>
      </div>

      <div className="movies-grid">
        {productData.map(product => (
          <div key={product.id} className="movie-catalog-card">
            <img src={product.image} alt={product.title} className="movie-poster" />
            
            <div className="movie-info">
              <h3>{product.title}</h3>
              <p className="movie-director">{product.category}</p>
              <p className="movie-year">Регион: {product.origin}</p>
              <div className="movie-rating">
             
              </div>
              <div className="product-price">
                <strong>{product.price} ₽/{product.unit}</strong>
              </div>
              
              <div className="movie-actions">
                <button 
                  className="detail-btn"
                  onClick={() => navigate(`/?product=${product.id}`)}
                >
                  Подробнее
                </button>
                <button 
                  className="add-to-basket-btn"
                  onClick={() => handleAddToBasket(product)}
                >
                  В корзину
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Добавить в корзину</h2>
              <button 
                className="close-modal"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="modal-movie-info">
                <img src={selectedProduct.image} alt={selectedProduct.title} />
                <div>
                  <h3>{selectedProduct.title}</h3>
                  <p>Категория: {selectedProduct.category}</p>
                  <p>Цена: {selectedProduct.price} ₽/{selectedProduct.unit}</p>
                </div>
              </div>
              
              <div className="modal-form">
                <div className="form-group">
                  <label>Количество:</label>
                  <div className="quantity-control">
                    <input
                      type="number"
                      min="0.1"
                      max="50"
                      step="0.1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseFloat(e.target.value) || 0.1)}
                    />
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
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
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    max={new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0]}
                  />
                  <small>Доставка в течение 2-14 дней</small>
                </div>
              </div>
              
              <div className="modal-summary">
                <p>Итого: <strong>{quantity} {unit} × {selectedProduct.price} ₽ = {(quantity * selectedProduct.price).toFixed(2)} ₽</strong></p>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Отмена
              </button>
              <button 
                className="confirm-btn"
                onClick={handleConfirmAdd}
              >
                Добавить в корзину
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;
