import { useState, useEffect, useRef } from "react";
import HamburgerButton from "../../Buttons/Hamburger/index.jsx";
import { Link } from "react-router-dom";
import LogoutUser from "../../Auth/Logout/index.jsx";

/**
 * HeaderNavigation component that provides navigation links in the header.
 *
 * @component
 * @example
 * return (
 *   <HeaderNavigation />
 * )
 */
const HeaderNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasUserName, setHasUserName] = useState(false);
  const menuRef = useRef(null);

  /**
   * Toggles the menu open or closed.
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /**
   * Handles clicks outside the menu to close it.
   *
   * @param {Object} event - The event object.
   */
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    setHasUserName(!!userName);
  }, []);

  return (
    <nav className="bg-primary font-condensed w-full" ref={menuRef}>
      <div className="lg:hidden">
        <HamburgerButton isMenuOpen={isMenuOpen} onClick={toggleMenu} />
      </div>
      <ul
        className={`lg:flex lg:flex-col lg:static lg:w-auto lg:p-0 lg:shadow-none lg:bg-transparent bg-white md:rounded-md
          ${
            isMenuOpen ? "block" : "hidden"
          } absolute top-full left:0 xxs:-ml-14 md:ml-0 bg-primary transition-all duration-500 ease-in-out shadow-md text-2xl text-cedar p-4`}
      >
        <li className="py-2 px-5">
          <Link to="/" className="no-underline hover:underline">
            Home
          </Link>
        </li>
        {!hasUserName && (
          <li className="py-2 px-5">
            <Link to="/register" className="no-underline hover:underline">
              Register
            </Link>
          </li>
        )}
        <li className="py-2 px-5">
          <Link to="/venues" className="no-underline hover:underline">
            Venues
          </Link>
        </li>
        <li className="py-2 px-5">
          <Link to="/about" className="no-underline hover:underline">
            About
          </Link>
        </li>
        <li className="py-2 px-5">
          <LogoutUser />
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNavigation;
