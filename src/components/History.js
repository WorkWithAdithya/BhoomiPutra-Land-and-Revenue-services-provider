import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const History = ({ history = [], onClose }) => {
  return (
    <div className="relative bg-white w-full md:w-11/12 lg:w-3/4 xl:w-1/2 p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h1 className="text-4xl font-sans font-bold mb-4 text-center">
        Service History
      </h1>

      {history.length === 0 ? (
        <p className="text-gray-500 text-center">No items purchased yet.</p>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {history.map((service, index) => (
            <div key={index} className="border p-4 rounded-lg hover:shadow-lg">
              <h2 className="text-xl font-sans font-semibold">
                {service.name}
              </h2>
              <p>{service.description}</p>
              <p className="text-green-600 font-sans font-bold">
                Amount Paid: ₹{service.totalAmount}
              </p>
              <p>Booking Date: {service.bookingTime}</p>
              <p>Name: {service.name}</p>
              <p>Email: {service.email}</p>
              <p>Phone Number: {service.phone}</p>
              <p>City: {service.location}</p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onClose}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
      >
        <FaArrowLeft /> Back to Cart
      </button>
    </div>
  );
};

export default History;
