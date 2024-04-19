import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const DefaultButton = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    aria-label="Button"
    className="border-2 bg-white border-porsche p-2 px-8 rounded text-cedar font-condensed
  hover:bg-primary hover:text-white  transition-colors duration-300 ease-in-out"
  >
    {children}
  </Link>
);

DefaultButton.propTypes = {
  onClick: PropTypes.func,
  to: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default DefaultButton;
