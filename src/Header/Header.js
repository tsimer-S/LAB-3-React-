
import React from 'react';
import { Link } from 'react-router-dom';
import { useBasket } from '../contexts/BasketContext';
import './Header.css';

function Header() {
  const { getItemCount } = useBasket();

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <h1>🌿 Овощной Маркет</h1>
          </Link>
          <p className="header-subtitle">Свежие фермерские овощи с доставкой</p>
        </div>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Главная</Link>
          <Link to="/catalog" className="nav-link">Каталог овощей</Link>
          <Link to="/basket" className="nav-link basket-link">
            🛒 Корзина {getItemCount() > 0 && `(${getItemCount()})`}
          </Link>
          <Link to="/orders" className="nav-link">Мои заказы</Link>
          <Link to="/about" className="nav-link">О нас</Link>
        </nav>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-number">12</span>
            <span className="stat-label">видов овощей</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">⭐</span>
            <span className="stat-label">Лучший в Стране</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">🚚</span>
            <span className="stat-label">бесплатная доставка</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
