import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const DefaultButton = ({ to, children }) => (
  <Link
    to={to}
    className="border-2 bg-white border-porsche p-2 px-8 rounded text-cedar text-2xl font-condensed
  hover:bg-primary hover:text-white hover:border-primary transition-colors duration-300 ease-in-out"
  >
    {children}
  </Link>
);

DefaultButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default DefaultButton;
