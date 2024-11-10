import React from 'react';
import { HiNewspaper } from 'react-icons/hi';

const News = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 transition-all duration-300 hover:text-blue-500 cursor-pointer font-sans font-bold text-center mx-auto flex items-center justify-center gap-2">
        <HiNewspaper size={24} className="mr-2 text-blue-500" />
        News
      </h1>
      <p className="text-gray-600 font-sans text-center text-sm sm:text-base md:text-lg lg:text-xl">
        No news uploaded yet.
      </p>
    </div>
  );
};

export default News;
