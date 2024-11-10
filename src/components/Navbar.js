import { useState } from 'react';
import { Link } from 'react-scroll';
import {
  HiMenu,
  HiX,
  HiHome,
  HiInformationCircle,
  HiBriefcase,
  HiShoppingCart,
  HiNewspaper,
} from 'react-icons/hi';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-white shadow-md z-20 cursor-pointer">
      <div className="flex items-center space-x-3">
        <img
          src="/logo.jpg"
          alt="Logo"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
        />
        <span className="font-sans font-bold text-lg sm:text-xl">
          BhoomiPutra
        </span>
      </div>

      <div className="hidden md:flex flex-grow justify-center">
        <div className="flex space-x-4 md:space-x-6 lg:space-x-8 border border-blue-500 rounded-full p-1">
          <Link
            to="home"
            smooth={true}
            duration={500}
            activeClass="underline text-blue-700"
            className="flex items-center text-blue-500 px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-blue-100 transition text-sm sm:text-base"
          >
            <HiHome className="mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            Home
          </Link>
          <Link
            to="services"
            smooth={true}
            duration={500}
            activeClass="underline text-blue-700"
            className="flex items-center text-blue-500 px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-blue-100 transition text-sm sm:text-base"
          >
            <HiBriefcase className="mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            Service
          </Link>
          <Link
            to="cart"
            smooth={true}
            duration={500}
            activeClass="underline text-blue-700"
            className="flex items-center text-blue-500 px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-blue-100 transition text-sm sm:text-base"
          >
            <HiShoppingCart className="mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            Cart
          </Link>
          <Link
            to="news"
            smooth={true}
            duration={500}
            activeClass="underline text-blue-700"
            className="flex items-center text-blue-500 px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-blue-100 transition text-sm sm:text-base"
          >
            <HiNewspaper className="mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            News
          </Link>
          <Link
            to="about"
            smooth={true}
            duration={500}
            activeClass="underline text-blue-700"
            className="flex items-center text-blue-500 px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-blue-100 transition text-sm sm:text-base"
          >
            <HiInformationCircle className="mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            Contact Us
          </Link>
        </div>
      </div>

      <div className="md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-blue-500 focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <HiX className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <HiMenu className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-20 flex flex-col items-center space-y-4 p-4 md:hidden">
          <Link
            to="home"
            smooth={true}
            duration={500}
            activeClass="underline text-blue-700"
            onClick={toggleMobileMenu}
            className="flex items-center text-blue-500 py-2 w-full text-center rounded transition text-base sm:text-lg"
          >
            <HiHome className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
            Home
          </Link>
          <Link
            to="services"
            smooth={true}
            duration={500}
            activeClass="underline text-blue-700"
            onClick={toggleMobileMenu}
            className="flex items-center text-blue-500 py-2 w-full text-center rounded transition text-base sm:text-lg"
          >
            <HiBriefcase className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
            Service
          </Link>
          <Link
            to="cart"
            smooth={true}
            duration={500}
            activeClass="underline text-blue-700"
            onClick={toggleMobileMenu}
            className="flex items-center text-blue-500 py-2 w-full text-center rounded transition text-base sm:text-lg"
          >
            <HiShoppingCart className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
            Cart
          </Link>
          <Link
            to="news"
            smooth={true}
            duration={500}
            activeClass="underline text-blue-700"
            className="flex items-center text-blue-500 py-2 w-full text-center rounded transition text-base sm:text-lge"
          >
            <HiNewspaper className="mr-2  w-5 h-5 sm:w-6 sm:h-6" />
            News
          </Link>
          <Link
            to="about"
            smooth={true}
            duration={500}
            activeClass="underline text-blue-700"
            onClick={toggleMobileMenu}
            className="flex items-center text-blue-500 py-2 w-full text-center rounded transition text-base sm:text-lg"
          >
            <HiInformationCircle className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
