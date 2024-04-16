import { useState } from "react";
import HamburgerButton from "../../Buttons/Hamburger/index.jsx";
import { Link } from "react-router-dom";

const HeaderNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-primary font-condensed w-full">
      <div className="lg:hidden">
        <HamburgerButton isMenuOpen={isMenuOpen} onClick={toggleMenu} />
      </div>
      <ul
        className={`lg:flex lg:flex-col  lg:static lg:w-auto lg:p-0 lg:shadow-none lg:bg-transparent
          ${
            isMenuOpen ? "block" : "hidden"
          } absolute top-full left:0 xxs:-ml-14 md:ml-0 bg-primary transition-all duration-300 ease-in-out shadow-md text-2xl text-cedar text-shadow-black p-4`}
      >
        <li className="py-2 px-5  ">
          <Link to="/" className="no-underline hover:underline">
            Home
          </Link>
        </li>
        <li className="py-2 px-5 ">
          <Link to="/register" className="no-underline hover:underline">
            Register
          </Link>
        </li>
        <li className="py-2 px-5 ">
          <Link to="/venues" className="no-underline hover:underline">
            Venues
          </Link>
        </li>
        <li className="py-2 px-5">
          <Link to="/about" className="no-underline hover:underline">
            About Us
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNavigation;
