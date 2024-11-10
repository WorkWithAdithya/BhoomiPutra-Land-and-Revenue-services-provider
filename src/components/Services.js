import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import servicesData from '../data/services.json';
import History from './History';
import { MdGavel } from 'react-icons/md';

function Services({
  addToCart,
  removeFromCart,
  cartItems = [],
  historyItems = [],
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [overlaySearchTerm, setOverlaySearchTerm] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [showCartOverlay, setShowCartOverlay] = useState(false);

  const navigate = useNavigate();
  const services = servicesData || [];

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const overlayFilteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(overlaySearchTerm.toLowerCase())
  );

  const isServiceInCart = (serviceId) => {
    return cartItems.some((item) => item.id === serviceId);
  };

  return (
    <div
      className={`relative min-h-screen w-full p-4 sm:p-6 ${
        showCartOverlay ? 'opacity-50' : 'opacity-100'
      } bg-gray-100 flex flex-col items-center justify-start transition-opacity duration-300`}
    >
      <div className="w-full flex items-center justify-center mb-3 sm:mb-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold transition-all duration-300 hover:text-blue-500 cursor-pointer text-center mx-auto flex items-center justify-center gap-1 sm:gap-2">
          <MdGavel className="text-blue-500 text-xl sm:text-2xl md:text-3xl" />
          Our Services
        </h1>
      </div>

      <h2 className="text-center font-sans font-bold text-base sm:text-lg md:text-xl lg:text-2xl">
        Why Choose BhoomiPutra?
      </h2>
      <p className="text-center font-sans font-semibold text-gray-600 w-full mt-2 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base lg:text-lg">
        At BhoomiPutra, we're committed to revolutionizing the land and revenue
        services sector in Bangalore and its surrounding districts. Our mission
        is to create a transparent, efficient, and fraud-free ecosystem for all
        land transactions.
      </p>

      <div className="flex justify-center space-x-4 sm:space-x-6 mt-2 mb-3 sm:mb-4">
        <ul className="flex space-x-4 sm:space-x-6 list-disc list-inside text-gray-700 font-sans font-medium text-xs sm:text-sm md:text-base">
          <li>Transparency</li>
          <li>Efficiency</li>
          <li>Expertise</li>
          <li>Trustworthiness</li>
        </ul>
      </div>

      <div className="flex justify-center mt-3 sm:mt-4">
        <button
          onClick={() => setShowCartOverlay(true)}
          className="bg-gray-500 text-white text-xs sm:text-sm md:text-base lg:text-lg px-3 sm:px-5 py-1.5 sm:py-2 rounded hover:bg-gray-600 transition mb-4"
        >
          View Cart
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-screen-lg mx-auto overflow-hidden">
        {filteredServices.slice(0, 3).map((service) => (
          <div
            key={service.id}
            className="border p-4 sm:p-6 rounded-lg hover:shadow-lg transition bg-white duration-300 transform hover:scale-105"
          >
            <h2 className="text-lg sm:text-xl font-sans font-semibold mb-2 text-base sm:text-lg">
              {service.name}
            </h2>
            <p className="text-gray-700 mb-3 text-xs sm:text-sm">
              {service.description}
            </p>
            <p className="text-green-600 font-sans font-bold mb-3 text-xs sm:text-sm">
              Price: ₹{service.price}
            </p>
            <button
              onClick={() => {
                if (!isServiceInCart(service.id)) {
                  addToCart(service);
                } else {
                  alert('This service is already in your cart.');
                }
              }}
              className="inline-block mt-3 bg-blue-500 text-white text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 rounded hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105"
              disabled={isServiceInCart(service.id)}
            >
              {isServiceInCart(service.id) ? 'Added to Cart' : 'Select'}
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 sm:mt-6">
        <button
          onClick={() => setShowAll(true)}
          className="bg-blue-500 text-white text-xs sm:text-sm md:text-base lg:text-lg px-4 sm:px-6 py-2 sm:py-3 rounded hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105"
        >
          Show More Services
        </button>
      </div>

      {showCartOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full sm:w-4/5 lg:w-3/4 h-5/6 overflow-y-auto relative">
            <button
              onClick={() => setShowCartOverlay(false)}
              className="absolute top-4 right-4 bg-red-500 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 rounded hover:bg-red-600 transition-transform duration-300 transform hover:scale-105"
            >
              Close
            </button>
            <h2 className="text-xl sm:text-2xl font-sans font-bold mb-6 text-center">
              Your Cart
            </h2>

            {cartItems.length === 0 ? (
              <p className="text-gray-600 text-center text-sm sm:text-base">
                Your cart is empty.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="border p-3 sm:p-4 rounded-lg bg-white shadow-lg"
                  >
                    <h2 className="text-md sm:text-lg font-sans font-semibold mb-2">
                      {item.name}
                    </h2>
                    <p className="text-gray-700 mb-2 text-xs sm:text-sm">
                      {item.description}
                    </p>
                    <p className="text-green-600 font-sans font-bold mb-2 text-xs sm:text-sm">
                      Price: ₹{item.price}
                    </p>
                    <button
                      onClick={() => removeFromCart(item)}
                      className="bg-red-500 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {showAll && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full sm:w-4/5 lg:w-3/4 h-5/6 overflow-y-auto relative">
            <button
              onClick={() => setShowAll(false)}
              className="absolute top-4 right-4 bg-red-500 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 rounded hover:bg-red-600 transition-transform duration-300 transform hover:scale-105"
            >
              Back
            </button>
            <h2 className="text-xl sm:text-2xl font-sans font-bold mb-6 text-center mt-2 transition-all duration-300 hover:text-blue-500 cursor-pointer">
              More Services
            </h2>

            <div className="flex items-center justify-center mb-6">
              <input
                type="text"
                placeholder="Search services..."
                value={overlaySearchTerm}
                onChange={(e) => setOverlaySearchTerm(e.target.value)}
                className="border rounded px-2 sm:px-3 py-1 w-3/5 sm:w-2/5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-xs sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {overlayFilteredServices.map((service) => (
                <div
                  key={service.id}
                  className="border p-4 sm:p-6 rounded-lg hover:shadow-lg transition bg-white duration-300 transform hover:scale-105"
                >
                  <h2 className="text-lg font-sans font-semibold mb-2 text-base sm:text-lg">
                    {service.name}
                  </h2>
                  <p className="text-gray-700 mb-3">{service.description}</p>
                  <p className="text-green-600 font-sans font-bold mb-3">
                    Price: ₹{service.price}
                  </p>
                  <button
                    onClick={() => {
                      if (!isServiceInCart(service.id)) {
                        addToCart(service);
                      } else {
                        alert('This service is already in your cart.');
                      }
                    }}
                    className="inline-block mt-3 bg-blue-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105"
                    disabled={isServiceInCart(service.id)}
                  >
                    {isServiceInCart(service.id) ? 'Added to Cart' : 'Select'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center">
          <div className="relative w-5/6 sm:w-3/4 lg:w-2/3 bg-white h-3/4 shadow-lg p-4 overflow-y-auto">
            <History
              history={historyItems}
              onClose={() => setShowHistory(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;
