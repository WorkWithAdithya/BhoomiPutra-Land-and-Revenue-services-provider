import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const PaymentPage = ({
  services,
  totalAmount,
  addServiceToHistory,
  closeOverlay,
}) => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Validation function
  const validate = () => {
    const newErrors = {};
    let isValid = true;

    if (!userDetails.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!userDetails.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(userDetails.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!userDetails.phone) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(userDetails.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }

    if (!userDetails.location) {
      newErrors.location = 'Location is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    validate();
  }, [userDetails]);

  const handlePaymentConfirmation = () => {
    if (validate()) {
      const serviceData = {
        services: services,
        userDetails: userDetails,
        totalAmount: totalAmount,
        paymentStatus: 'Success',
        bookingTime: new Date().toLocaleString(),
        ...userDetails,
      };

      // Add to history
      addServiceToHistory(serviceData);

      alert(`Thank you! Your payment is done. We will contact you shortly. 😊`);
      closeOverlay();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-auto max-h-[80vh] overflow-y-auto relative">
        <button
          onClick={closeOverlay}
          className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Close
        </button>
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-sans font-bold transition-all duration-300 hover:text-blue-500 cursor-pointer">
            Payment Details
          </h2>
          <p className="text-lg sm:text-xl font-sans font-semibold text-gray-600 mt-2">
            Please fill in your details and proceed to payment.
          </p>
        </div>

        <div className="space-y-4">
          {services.map((item, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg bg-white shadow-lg mb-4 cursor-pointer"
            >
              <h3 className="text-lg sm:text-xl font-sans font-semibold">
                {item.name}
              </h3>
              <p className="text-gray-700 mb-2 text-sm sm:text-base">
                {item.description}
              </p>
              <p className="text-green-600 font-sans font-bold text-sm sm:text-base">
                Price: ₹{item.price}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <label className="block text-sm sm:text-base font-sans font-medium">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md text-sm sm:text-base ${
                errors.name ? 'border-red-500' : ''
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm sm:text-base font-sans font-medium">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md text-sm sm:text-base ${
                errors.email ? 'border-red-500' : ''
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm sm:text-base font-sans font-medium">
              Phone Number:
            </label>
            <input
              type="text"
              name="phone"
              value={userDetails.phone}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md text-sm sm:text-base ${
                errors.phone ? 'border-red-500' : ''
              }`}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm sm:text-base font-sans font-medium">
              Location:
            </label>
            <select
              name="location"
              value={userDetails.location}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md text-sm sm:text-base ${
                errors.location ? 'border-red-500' : ''
              }`}
            >
              <option value="">Select your location</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Bellary">Bellary</option>
              <option value="Shivamogga">Shivamogga</option>
              <option value="Mysore">Mysore</option>
            </select>
            {errors.location && (
              <p className="text-sm text-red-500">{errors.location}</p>
            )}
          </div>

          <div className="mt-6 text-center">
            <QRCodeCanvas value={`Amount: ₹${totalAmount}`} size={200} />
            <p className="mt-2 text-lg sm:text-xl font-sans font-semibold text-red-600">
              Total Amount: ₹{totalAmount}
            </p>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handlePaymentConfirmation}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer text-sm sm:text-base lg:text-lg"
              disabled={Object.keys(errors).some((key) => errors[key])}
            >
              Confirm Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
