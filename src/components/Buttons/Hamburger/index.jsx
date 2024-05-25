import PropTypes from "prop-types";

/**
 * HamburgerButton component that renders a button to toggle a menu.
 *
 * @component
 * @param {Object} props - The props for HamburgerButton.
 * @param {boolean} props.isMenuOpen - Indicates whether the menu is open.
 * @param {function} props.onClick - The function to handle the click event.
 * @example
 * return (
 *   <HamburgerButton isMenuOpen={isMenuOpen} onClick={handleMenuToggle} />
 * )
 */
const HamburgerButton = ({ isMenuOpen, onClick }) => {
  return (
    <button className="p-2 text-cedar text-3xl" onClick={onClick}>
      {isMenuOpen ? <span>&#x2715;</span> : <span>☰</span>}
    </button>
  );
};

HamburgerButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
};

export default HamburgerButton;
