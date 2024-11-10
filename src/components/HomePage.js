import React from 'react';
import { scroller } from 'react-scroll';

const HomePage = () => {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen w-screen bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('/home.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 text-center text-white px-4 md:px-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-4 animate-slide-in">
          Welcome to BhoomiPutra
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 animate-fade-in-delay">
          Your Trusted Partner in Land Transactions
        </p>

        <button
          onClick={() =>
            scroller.scrollTo('services', {
              smooth: true,
              duration: 500,
              offset: -70,
            })
          }
          className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 rounded-lg text-white font-sans font-semibold hover:bg-blue-700 transition transform hover:scale-105 text-sm sm:text-base md:text-lg lg:text-xl animate-bounce"
        >
          Explore Our Services
        </button>
      </div>
    </div>
  );
};

export default HomePage;
