import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import saveFavoriteVenue from "../../store/FavoriteStore";
import PropTypes from "prop-types";

const HeartIcon = ({ venue }) => {
  const { favorites, addFavorite, removeFavorite } = saveFavoriteVenue();
  const isFavorite = favorites.some((fav) => fav.id === venue.id);
  const userName = localStorage.getItem("userName");

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
