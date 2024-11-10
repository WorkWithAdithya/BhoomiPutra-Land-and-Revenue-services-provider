import React, { useState } from 'react';
import { FaCartPlus, FaHistory } from 'react-icons/fa';
import PaymentPage from './PaymentPage';

function Cart({
  cartItems,
  removeFromCart,
  historyItems,
  addServiceToHistory,
  openHistoryOverlay,
  openPaymentOverlay,
}) {
  const [isPaymentOverlayOpen, setPaymentOverlayOpen] = useState(false);
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  const openPaymentOverlayHandler = () => {
    setPaymentOverlayOpen(true);
  };

  const closePaymentOverlayHandler = () => {
    setPaymentOverlayOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl mb-4 sm:text-3xl md:text-4xl transition-all duration-300 hover:text-blue-500 cursor-pointer font-sans font-bold text-center mx-auto flex items-center justify-center gap-1 sm:gap-2">
          <FaCartPlus size={24} className="mr-2 text-blue-500" />
          Your Cart
        </h1>
      </div>

      <div className="w-full flex justify-center mb-4">
        <button
          onClick={openHistoryOverlay}
          className="flex items-center bg-gray-700 text-white px-4 py-2 rounded mb-4 hover:bg-gray-800 transition gap-2"
        >
          <FaHistory className="text-lg" />
          <span className="text-sm sm:text-base">History</span>
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 font-sans text-center">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg bg-white shadow-lg"
              >
                <h2 className="text-lg sm:text-xl  font-sans  font-semibold mb-2">
                  {item.name}
                </h2>
                <p className="text-gray-700 mb-2">{item.description}</p>
                <p className="text-green-600 font-sans  font-bold mb-2">
                  Price: ₹{item.price}
                </p>
                <button
                  onClick={() => removeFromCart(item)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 w-full flex flex-col items-center text-center">
            <h3 className="text-2xl sm:text-3xl font-sans  font-bold mb-4">
              Total Amount: ₹{totalAmount}
            </h3>
            <button
              onClick={openPaymentOverlayHandler}
              className="bg-blue-500 text-white px-8 py-4 rounded hover:bg-blue-600 transition w-full max-w-xs"
            >
              Proceed to Pay!
            </button>
          </div>
        </>
      )}

      {isPaymentOverlayOpen && (
        <PaymentPage
          services={cartItems}
          totalAmount={totalAmount}
          addServiceToHistory={addServiceToHistory}
          closeOverlay={closePaymentOverlayHandler}
        />
      )}
    </div>
  );
}

export default Cart;
