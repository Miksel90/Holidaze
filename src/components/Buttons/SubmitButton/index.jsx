import PropTypes from "prop-types";

/**
 * SubmitButton component that renders a styled submit button.
 *
 * @component
 * @param {Object} props - The props for SubmitButton.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @example
 * return (
 *   <SubmitButton>Submit</SubmitButton>
 * )
 */
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
