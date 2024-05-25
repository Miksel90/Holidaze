import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * DefaultButton component that renders a styled link acting as a button.
 *
 * @component
 * @param {Object} props - The props for DefaultButton.
 * @param {string} props.to - The URL to navigate to when the button is clicked.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @param {function} [props.onClick] - The function to handle the click event.
 * @example
 * return (
 *   <DefaultButton to="/home" onClick={handleClick}>
 *     Home
 *   </DefaultButton>
 * )
 */
const DefaultButton = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    aria-label="Button"
    className="border-2 bg-white border-porsche py-2 px-8 rounded text-cedar font-condensed 
  hover:bg-primary hover:text-white transition-colors duration-300 ease-in-out"
  >
    {children}
  </Link>
);

DefaultButton.propTypes = {
  onClick: PropTypes.func,
  to: PropTypes.string,
  children: PropTypes.node,
};

export default DefaultButton;
