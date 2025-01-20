import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaShoppingCart,
  FaShoppingBag,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar flex flex-col md:flex-row items-center justify-between p-5 bg-black text-white">
      <div className="navbar__logo flex items-center justify-between w-full md:w-auto">
        <h2 className="navbar__logo-text text-2xl font-bold">E-Commerce</h2>
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      <div
        className={`navbar__links ${
          isMenuOpen ? "block" : "hidden"
        } md:flex md:items-center w-full md:w-auto mt-4 md:mt-0`}
      >
        <ul className="navbar__links-list flex flex-col md:flex-row items-center gap-6">
          <li>
            <Link
              to="/"
              className="flex items-center hover:text-gray-400 transition duration-200"
            >
              <FaShoppingBag className="mr-2" />
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="flex items-center hover:text-gray-400 transition duration-200"
            >
              <FaUser className="mr-2" />
              Account
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="flex items-center hover:text-gray-400 transition duration-200"
            >
              <FaShoppingCart className="mr-2" />
              Cart
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
