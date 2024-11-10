import React from 'react';
import { FaEnvelope, FaPhone, FaHandshake } from 'react-icons/fa';

function AboutContact() {
  const [result, setResult] = React.useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult('Sending....');
    const formData = new FormData(event.target);

    formData.append('access_key', '84808b55-4285-470e-83d7-09b756af3189');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult('Form Submitted Successfully');
        event.target.reset();
      } else {
        setResult(data.message);
      }
    } catch (error) {
      console.log('Error', error);
      setResult('An error occurred, please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6 bg-gray-100">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold mb-6 sm:mb-8 text-center text-black-700 transition-all duration-300 hover:text-blue-500 cursor-pointer flex items-center justify-center gap-2">
        <FaHandshake className="text-blue-500 text-xl sm:text-2xl lg:text-3xl" />{' '}
        Get In Touch
      </h1>

      <div className="flex flex-col sm:flex-row justify-center items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="flex items-center space-x-2 text-base sm:text-lg text-gray-700">
          <FaEnvelope className="text-blue-700 text-lg sm:text-xl" />
          <span>Email: Bhoomiputra@gmail.com</span>
        </div>
        <div className="flex items-center space-x-2 text-base sm:text-lg text-gray-700">
          <FaPhone className="text-blue-700 text-lg sm:text-xl" />
          <span>Phone: 8861232984</span>
        </div>
      </div>

      <div className="flex-grow flex justify-center items-center">
        <div className="w-full lg:w-3/4 bg-white p-6 sm:p-8 rounded-lg shadow-lg flex flex-col lg:flex-row gap-6 sm:gap-8">
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <img
              src="/contact.png"
              alt="Contact Illustration"
              className="w-full max-w-xs sm:max-w-md h-auto rounded-lg"
            />
          </div>

          <form
            className="w-full lg:w-1/2 flex flex-col gap-4 sm:gap-6"
            onSubmit={onSubmit}
          >
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-black-700 text-center lg:text-left transition-all duration-300 hover:text-blue-500 cursor-pointer">
              Contact Form
            </h2>

            <div className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <label className="block text-base sm:text-lg font-sans font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-3 sm:px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-base sm:text-lg font-sans font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-3 sm:px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-base sm:text-lg font-sans font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full px-3 sm:px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-base sm:text-lg font-sans font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  className="w-full px-3 sm:px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your message"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 sm:py-3 mt-4 bg-blue-700 text-white font-sans font-bold text-sm sm:text-base rounded-md hover:bg-blue-800 transition-all duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer className="text-center py-4 sm:py-6 mt-auto bg-gray-200">
        <p className="text-gray-600 text-xs sm:text-sm">
          © 2024 Bhoomiputra. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default AboutContact;
