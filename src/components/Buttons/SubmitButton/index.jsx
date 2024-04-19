import PropTypes from "prop-types";

function SubmitButton({ children }) {
  return (
    <button
      className="border-2 border-porsche p-2 px-8 rounded text-cedar text-lg font-condensed bg-white
       hover:bg-primary hover:text-white hover:border-porsche transition-colors duration-300 ease-in-out"
      type="submit"
    >
      {children}
    </button>
  );
}

SubmitButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SubmitButton;
