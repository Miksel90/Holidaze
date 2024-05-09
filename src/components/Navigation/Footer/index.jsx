import { Link } from "react-router-dom";

const FooterNavigation = () => {
  return (
    <nav className="flex flex-col md:flex-row font-condensed items-center justify-center ">
      <ul className="flex flex-col md:flex-row text-lg md:text-xl items-center gap-3 md:gap-10 py-2 px-4 bg-white rounded-sm uppercase">
        <li className="md:mr-4 hover:underline">
          <Link to="/venues">Browse Venues</Link>
        </li>
        <li className="md:mr-4 hover:underline">
          <Link to="/about">Explore core Services</Link>
        </li>
        <li className="md:mr-4 hover:underline">
          <Link to="/about">FAQ</Link>
        </li>
        <li className="md:mr-4 hover:underline">
          <a href="https://facebook.com">Follow us</a>
        </li>
      </ul>
    </nav>
  );
};

export default FooterNavigation;
