
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import productData from './movieData';
import Header from './Header/Header.js';
import Footer from './Footer/Footer.js';
import { BasketProvider } from './contexts/BasketContext';
import BasketList from './components/basket/BasketList.jsx';
import BasketDetail from './components/basket/BasketDetail.jsx';
import CreateOrder from './components/basket/CreateOrder.jsx';
import UpdateOrder from './components/basket/UpdateOrder.jsx';
import ProductCatalog from './components/ProductCatalog.jsx';

function App() {
  return (
    <BasketProvider>
      <Router>
        <div className="App">
          <Header />
          
          <main className="app-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<ProductCatalog />} />
              <Route path="/basket" element={<BasketList />} />
              <Route path="/create-order" element={<CreateOrder />} />
              <Route path="/order/:orderId" element={<BasketDetail />} />
              <Route path="/update-order/:orderId" element={<UpdateOrder />} />
              <Route path="/orders" element={<OrdersList />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </BasketProvider>
  );
}

function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBackClick = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      {selectedProduct ? (
        <div>
          <button onClick={handleBackClick}>← Назад к каталогу</button>
          <div className="product-detail">
            <img src={selectedProduct.image} alt={selectedProduct.title} />
            <div className="detail-info">
              <h1>{selectedProduct.title}</h1>
              <p><strong>Категория:</strong> {selectedProduct.category}</p>
              <p><strong>Регион происхождения:</strong> {selectedProduct.origin}</p>
              <p><strong>Сезон:</strong> {selectedProduct.year}</p>
              <p><strong>Цена:</strong> {selectedProduct.price} ₽/{selectedProduct.unit}</p>
             
              <p><strong>Описание:</strong> {selectedProduct.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2>Свежие фермерские овощи</h2>
          <p className="catalog-info">В каталоге {productData.length} видов овощей</p>
          <div className="product-list">
            {productData.map(product => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => handleProductClick(product)}
              >
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
                <p><strong>{product.price} ₽/{product.unit}</strong></p>
                <p className="product-origin">{product.origin}</p>
                <small> {product.rating} | {product.category}</small>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Удаляем дублирующую функцию ProductCatalog, так как она уже импортируется

function OrdersList() {
  return <div>История заказов</div>;
}

export default App;
