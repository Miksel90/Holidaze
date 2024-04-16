import PropTypes from "prop-types";

const Overlay = ({ isActive }) => {
  if (!isActive) return null;

  return <div className="absolute inset-0 bg-black bg-opacity-10 z-50"></div>;
};

Overlay.defaultProps = {
  isActive: false,
};

Overlay.propTypes = {
  isActive: PropTypes.bool,
};

export default Overlay;

<div className="relative">
  <Overlay isActive={true} />
</div>;
