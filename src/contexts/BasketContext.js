
import React, { createContext, useState, useContext } from 'react';

const BasketContext = createContext();

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
};

export const BasketProvider = ({ children }) => {
  // Фейковые данные для корзины овощей
  const initialBasketItems = [
    {
      id: 1,
      productId: 1,
      title: "Свежие помидоры",
      category: "Паслёновые",
      quantity: 2,
      unit: "кг",
      price: 189,
      deliveryDate: "2024-12-20",
      totalPrice: 378
    },
    {
      id: 2,
      productId: 2,
      title: "Морковь сладкая",
      category: "Корнеплоды",
      quantity: 1.5,
      unit: "кг",
      price: 89,
      deliveryDate: "2024-12-20",
      totalPrice: 133.5
    }
  ];

  const initialOrders = [
    {
      id: 1,
      orderNumber: "VEG-001",
      date: "2024-12-15T14:30:00",
      items: [
        {
          id: 1,
          productId: 4,
          title: "Картофель молодой",
          quantity: 3,
          unit: "кг",
          price: 79,
          totalPrice: 237
        }
      ],
      totalAmount: 237,
      status: "completed",
      paymentMethod: "card",
      customerName: "Иван Иванов",
      customerEmail: "ivan@example.com",
      customerPhone: "+7 (123) 456-78-90"
    }
  ];

  const [basketItems, setBasketItems] = useState(initialBasketItems);
  const [orders, setOrders] = useState(initialOrders);

  // Добавить в корзину
  const addToBasket = (product, quantity, unit = "кг", deliveryDate) => {
    const existingItem = basketItems.find(item => item.productId === product.id);
    
    if (existingItem) {
      // Обновляем существующий элемент
      const updatedItems = basketItems.map(item =>
        item.id === existingItem.id
          ? {
              ...item,
              quantity: parseFloat((item.quantity + quantity).toFixed(2)),
              unit: unit,
              deliveryDate: deliveryDate || item.deliveryDate,
              totalPrice: parseFloat(((item.quantity + quantity) * item.price).toFixed(2))
            }
          : item
      );
      setBasketItems(updatedItems);
    } else {
      // Добавляем новый элемент
      const newItem = {
        id: Date.now(),
        productId: product.id,
        title: product.title,
        category: product.category,
        quantity: parseFloat(quantity.toFixed(2)),
        unit: unit,
        price: product.price,
        deliveryDate: deliveryDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // через 2 дня
        totalPrice: parseFloat((quantity * product.price).toFixed(2))
      };
      setBasketItems([...basketItems, newItem]);
    }
  };

  // Обновить элемент корзины
  const updateBasketItem = (id, updates) => {
    const updatedItems = basketItems.map(item =>
      item.id === id
        ? {
            ...item,
            ...updates,
            totalPrice: updates.quantity 
              ? parseFloat((updates.quantity * item.price).toFixed(2))
              : item.totalPrice
          }
        : item
    );
    setBasketItems(updatedItems);
  };

  // Удалить из корзины
  const removeFromBasket = (id) => {
    setBasketItems(basketItems.filter(item => item.id !== id));
  };

  // Очистить корзину
  const clearBasket = () => {
    setBasketItems([]);
  };

  // Создать заказ
  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      orderNumber: `VEG-${String(Date.now()).slice(-6)}`,
      date: new Date().toISOString(),
      items: [...basketItems],
      totalAmount: parseFloat(getTotalPrice().toFixed(2)),
      status: "pending",
      ...orderData
    };
    setOrders([...orders, newOrder]);
    clearBasket();
    return newOrder;
  };

  // Обновить заказ
  const updateOrder = (id, updates) => {
    const updatedOrders = orders.map(order =>
      order.id === id ? { ...order, ...updates } : order
    );
    setOrders(updatedOrders);
  };

  // Удалить заказ
  const deleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  // Получить общую сумму корзины
  const getTotalPrice = () => {
    return parseFloat(basketItems.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2));
  };

  // Получить количество элементов в корзине
  const getItemCount = () => {
    return basketItems.length;
  };

  const value = {
    basketItems,
    orders,
    addToBasket,
    updateBasketItem,
    removeFromBasket,
    clearBasket,
    createOrder,
    updateOrder,
    deleteOrder,
    getTotalPrice,
    getItemCount
  };

  return (
    <BasketContext.Provider value={value}>
      {children}
    </BasketContext.Provider>
  );
};
