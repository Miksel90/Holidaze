import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import saveFavoriteVenue from "../../store/FavoriteStore";
import PropTypes from "prop-types";

/**
 * HeartIcon component that allows users to add or remove a venue from their favorites.
 *
 * @component
 * @param {Object} props - The props for HeartIcon.
 * @param {Object} props.venue - The venue object.
 * @param {string} props.venue.id - The ID of the venue.
 * @param {string} props.venue.name - The name of the venue.
 * @param {string} [props.venue.description] - A description of the venue.
 * @param {number} props.venue.price - The price of the venue.
 * @example
 * return (
 *   <HeartIcon venue={venue} />
 * )
 */
const HeartIcon = ({ venue }) => {
  const { favorites, addFavorite, removeFavorite } = saveFavoriteVenue();
  const isFavorite = favorites.some((fav) => fav.id === venue.id);
  const userName = localStorage.getItem("userName");

  /**
   * Handles the click event to add or remove the venue from favorites.
   *
   * @param {Object} event - The click event object.
   */
  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isFavorite) {
      removeFavorite(venue.id);
    } else {
      addFavorite(venue);
    }
  };

  if (!userName) return null;

  return (
    <div onClick={handleClick}>
      {isFavorite ? (
        <AiFillHeart className="text-danger cursor-pointer" />
      ) : (
        <AiOutlineHeart className="text-danger cursor-pointer" />
      )}
    </div>
  );
};

HeartIcon.propTypes = {
  venue: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default HeartIcon;
