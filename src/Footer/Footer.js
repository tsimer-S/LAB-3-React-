
import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>🌱 Овощной Маркет</h3>
          <p className="footer-description">
            Свежие фермерские овощи прямо с грядки. 
            Мы заботимся о качестве и доставляем только лучшие продукты.
          </p>
          <div className="footer-social">
            <span className="social-icon">📱</span>
            <span className="social-icon">✉️</span>
            <span className="social-icon">📷</span>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Категории</h4>
          <ul className="footer-links">
            <li><a href="#root">Паслёновые</a></li>
            <li><a href="#root">Корнеплоды</a></li>
            <li><a href="#root">Крестоцветные</a></li>
            <li><a href="#root">Тыквенные</a></li>
            <li><a href="#root">Луковые</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Информация</h4>
          <ul className="footer-links">
            <li><a href="#about">О компании</a></li>
            <li><a href="#delivery">Доставка и оплата</a></li>
            <li><a href="#returns">Возврат и обмен</a></li>
            <li><a href="#privacy">Политика конфиденциальности</a></li>
            <li><a href="#faq">Частые вопросы</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Контакты</h4>
          <div className="footer-contact">
            <p>📧 tsimer_s@iuca.kg</p>
            <p>📞 +996 (553)415-315</p>
            <p>🕒 Пн-Пт: 9:00-20:00</p>
            <p>📍 Токмок, ул. Шамшинская, д. 27</p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {currentYear} Овощной Маркет. Свежие овощи круглый год.</p>
        <p className="footer-certificates">
          🏆 Сертифицированная органическая продукция • 🌱 100% натурально • 🚚 Доставка по всей России
        </p>
      </div>
    </footer>
  );
}

export default Footer;
