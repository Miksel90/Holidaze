import { PropTypes } from "prop-types";

function Card({ children }) {
  return <div>{children}</div>;
}

export default Card;
Card.propTypes = {
  children: PropTypes.node,
};
