import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Element } from 'react-scroll';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AboutContact from './components/AboutContact';
import Services from './components/Services';
import Cart from './components/Cart';
import PaymentPage from './components/PaymentPage';
import History from './components/History';
import News from './components/News';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [historyItems, setHistoryItems] = useState([]);
  const [showPaymentOverlay, setShowPaymentOverlay] = useState(false);
  const [showHistoryOverlay, setShowHistoryOverlay] = useState(false);

  const addToCart = (service) => {
    setCartItems((prevItems) => [...prevItems, service]);
  };

  const removeFromCart = (service) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== service.id)
    );
  };

  const addServiceToHistory = (serviceData) => {
    setHistoryItems((prevItems) => [...prevItems, serviceData]);
  };

  return (
    <Router>
      <Navbar />
      <div>
        <Element name="home">
          <HomePage />
        </Element>

        <Element name="services">
          <Services
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            cartItems={cartItems}
          />
        </Element>

        <Element name="cart">
          <Cart
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            historyItems={historyItems}
            addServiceToHistory={addServiceToHistory}
            openPaymentOverlay={() => setShowPaymentOverlay(true)}
            openHistoryOverlay={() => setShowHistoryOverlay(true)}
          />
        </Element>
        <Element name="news">
          <News />
        </Element>

        <Element name="about">
          <AboutContact />
        </Element>
      </div>

      {showPaymentOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex justify-center items-center">
          <PaymentPage
            services={cartItems}
            totalAmount={cartItems.reduce(
              (total, item) => total + item.price,
              0
            )}
            addServiceToHistory={addServiceToHistory}
            closeOverlay={() => setShowPaymentOverlay(false)}
          />
        </div>
      )}

      {showHistoryOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex justify-center items-center">
          <History
            history={historyItems}
            onClose={() => setShowHistoryOverlay(false)}
          />
        </div>
      )}
    </Router>
  );
}

export default App;
