import PropTypes from "prop-types";

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
