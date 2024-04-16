import { Link } from "react-router-dom";

const FooterNavigation = () => {
  return (
    <nav className="flex flex-col md:flex-row font-condensed items-center justify-center">
      <ul className="flex flex-col md:flex-row text-lg md:text-xl items-center gap-3 md:gap-15 mb-5 uppercase">
        <li className="md:mr-4">
          <Link to="/venues">Browse Venues</Link>
        </li>
        <li className="md:mr-4">
          <Link to="/about">Explore core Services</Link>
        </li>
        <li className="md:mr-4">
          <Link to="/about">FAQ</Link>
        </li>
        <li className="md:mr-4">
          <a href="https://facebook.com">Follow us</a>
        </li>
      </ul>
    </nav>
  );
};

export default FooterNavigation;
