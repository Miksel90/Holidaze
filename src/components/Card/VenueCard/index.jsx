import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import DefaultImage from "../../../assets/Images/default.webp";
import HeartIcon from "../../FavoriteIcon";

const StarIcon = () => <FaStar className="text-primary text-2xl " />;

/**
 * VenueCard component that displays information about a venue.
 *
 * @component
 * @param {Object} props - The props for VenueCard.
 * @param {string} props.id - The ID of the venue.
 * @param {string} props.name - The name of the venue.
 * @param {string} [props.created] - The creation date of the venue.
 * @param {string} props.description - A short description of the venue.
 * @param {Object} props.location - The location details of the venue.
 * @param {string} [props.location.address] - The address of the venue.
 * @param {string} props.location.city - The city where the venue is located.
 * @param {string} props.location.country - The country where the venue is located.
 * @param {number} props.maxGuests - The maximum number of guests allowed at the venue.
 * @param {number} props.price - The price per night to stay at the venue.
 * @param {number} [props.rating] - The rating of the venue.
 * @param {Array<Object>} [props.media] - An array of media objects related to the venue.
 * @param {string} props.media[].url - The URL of the media.
 * @param {string} [props.media[].alt] - The alt text for the media.
 * @example
 * const venue = {
 *   id: "1",
 *   name: "Beautiful Beach House",
 *   created: "2023-01-01",
 *   description: "A lovely beach house with stunning views.",
 *   location: {
 *     city: "Miami",
 *     country: "USA"
 *   },
 *   maxGuests: 6,
 *   price: 300,
 *   rating: 4,
 *   media: [{ url: "http://example.com/image.jpg", alt: "Beach House" }]
 * };
 * return (
 *   <VenueCard {...venue} />
 * )
 */
function VenueCard({
  id,
  created,
  name,
  description,
  location,
  maxGuests,
  price,
  rating,
  media = [],
}) {
  const [imageSrc, setImageSrc] = useState(
    media.length > 0 ? media[0].url : DefaultImage
  );

  /**
   * Handles the error event when the image fails to load and sets a default image.
   */
  const handleImageError = () => {
    setImageSrc(DefaultImage);
  };

  /**
   * Formats the creation date.
   *
   * @param {string} created - The creation date of the venue.
   * @returns {string} The formatted date.
   */
  const formattedDate = (created) => {
    return created
      ? new Date(created).toLocaleDateString()
      : "No date provided";
  };

  /**
   * Formats the price.
   *
   * @returns {string} The formatted price.
   */
  const formattedPrice = () => {
    const roundedPrice = parseFloat(price).toFixed(2);
    return roundedPrice.length <= 10
      ? `$${roundedPrice}`
      : "Price Is Not Listed";
  };

  const ratingStars =
    rating > 0 ? (
      Array.from({ length: rating }, (_, index) => <StarIcon key={index} />)
    ) : (
      <span className="text-md">No Rating</span>
    );

  const cutDescription =
    description.length > 30
      ? `${description.substring(0, 30)}...`
      : description;

  const venue = {
    id,
    name,
    description,
    location,
    maxGuests,
    price,
    rating,
    media,
  };

  return (
    <div className="relative flex flex-col items-center justify-center mt-2 bg-white border-2 border-cedar w-full max-w-sm rounded-sm font-sans group hover:shadow-lg hover:shadow-cedar transition-shadow duration-200">
      <div className="absolute top-2 right-2 text-4xl">
        <HeartIcon venue={venue} />
      </div>
      <Link to={`/venues/${id}`} className="block w-full h-full">
        <img
          src={imageSrc}
          alt={
            media.length > 0 && media[0].alt
              ? media[0].alt
              : "Default venue image"
          }
          className="w-full object-cover "
          style={{ height: "300px" }}
          onError={handleImageError}
        />
        <div className="p-4 w-full text-start">
          <div className="text-3xl font-medium font-condensed text-ellipsis overflow-hidden ...">
            {name}
          </div>
          <p className="text-md mt-1">Created: {formattedDate(created)}</p>
          <p className="text-md mt-2">{cutDescription}</p>
          <p className="text-sm mt-1">{`${location.city}, ${location.country}`}</p>
          <p className="text-sm mt-1">{`Max Guests: ${maxGuests} `}</p>
          <p className="font-condensed font-medium text-md mt-2 ">
            Price/Night: {formattedPrice()}
          </p>

          <div className="flex flex-row justify-center mt-8 items-center">
            {ratingStars}
          </div>
        </div>
      </Link>
    </div>
  );
}

VenueCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  created: PropTypes.string,
  description: PropTypes.string.isRequired,
  location: PropTypes.shape({
    address: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
  }),
  maxGuests: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number,
  media: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ),
};

export default VenueCard;
