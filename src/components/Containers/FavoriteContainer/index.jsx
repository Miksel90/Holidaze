import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useFetchSingleVenue } from "../../../hooks/useFetchSingleVenue";
import { useState, useEffect } from "react";
import HeartIcon from "../../FavoriteIcon";
import DefaultImage from "../../../assets/Images/default.webp";
import useFavoriteStore from "../../../store/FavoriteStore";

/**
 * FavoritesContainer component that displays the user's favorite venues.
 *
 * @component
 * @example
 * return (
 *   <FavoritesContainer />
 * )
 */
const FavoritesContainer = () => {
  const { favorites } = useFavoriteStore();

  return (
    <div className="flex flex-col px-2">
      <h2 className="text-3xl font-condensed mb-4 text-cedar">
        My Favorite Venues
      </h2>
      {favorites.length === 0 ? (
        <p>No favorite venues yet.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
          {favorites.map((venue) => (
            <FavoriteVenue key={venue.id} venueId={venue.id} />
          ))}
        </ul>
      )}
    </div>
  );
};

/**
 * Truncates a name if it exceeds the maximum length.
 *
 * @param {string} name - The name to truncate.
 * @param {number} maxLength - The maximum length of the name.
 * @returns {string} The truncated name.
 */
const truncateName = (name, maxLength) => {
  return name.length > maxLength ? name.substring(0, maxLength) + "..." : name;
};

/**
 * FavoriteVenue component that displays a single favorite venue.
 *
 * @component
 * @param {Object} props - The props for FavoriteVenue.
 * @param {string} props.venueId - The ID of the venue.
 * @example
 * return (
 *   <FavoriteVenue venueId="123" />
 * )
 */
const FavoriteVenue = ({ venueId }) => {
  const { venue, isLoading, error } = useFetchSingleVenue(venueId);
  const [imageSrc, setImageSrc] = useState(DefaultImage);

  useEffect(() => {
    if (venue && venue.media && venue.media.length > 0) {
      setImageSrc(venue.media[0].url);
    }
  }, [venue]);

  /**
   * Handles the error event when the image fails to load and sets a default image.
   */
  const handleImageError = () => {
    setImageSrc(DefaultImage);
  };

  if (isLoading) return <div>Loading Favorites</div>;
  if (error) return <div>Error: {error}</div>;
  if (!venue) return null;

  return (
    <li className="relative bg-white border-cedar border-2">
      <div className="absolute top-2 right-2 text-4xl ">
        <HeartIcon venue={venue} />
      </div>
      <Link to={`/venues/${venue.id}`} className="block w-full h-full">
        <h3 className="text-2xl font-semibold p-2 text-start">
          {truncateName(venue.name, 10)}
        </h3>
        <img
          src={imageSrc}
          alt={
            venue.media && venue.media.length > 0 && venue.media[0].alt
              ? venue.media[0].alt
              : "Default venue image"
          }
          className="w-full h-52 object-cover px-0"
          onError={handleImageError}
        />
        <p className="overflow-hidden text-ellipsis whitespace-nowrap p-4 text-start font-condensed text-xl">
          About: {venue.description}
        </p>
      </Link>
    </li>
  );
};

FavoriteVenue.propTypes = {
  venueId: PropTypes.string.isRequired,
};

export default FavoritesContainer;
