import { Link } from "react-router-dom";

const FooterNavigation = () => {
  return (
    <nav className="  font-condensed">
      <ul className="">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default FooterNavigation;
