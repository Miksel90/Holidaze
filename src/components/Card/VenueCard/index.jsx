import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import DefaultImage from "../../../assets/Images/default.webp";

const StarIcon = () => <FaStar className="text-primary text-2xl " />;

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

  const handleImageError = () => {
    setImageSrc(DefaultImage);
  };

  const formattedDate = (created) => {
    return created
      ? new Date(created).toLocaleDateString()
      : "No date provided";
  };

  const formattedPrice = () => {
    const roundedPrice = parseFloat(price).toFixed(2);
    return roundedPrice.length <= 10
      ? `$${roundedPrice}`
      : "Priced Is Not Listed";
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

  return (
    <div className="flex flex-col items-center justify-center mt-2 bg-white border-2 border-cedar w-full max-w-sm rounded-sm font-sans group hover:shadow-lg hover:shadow-cedar transition-shadow duration-200">
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
  ).isRequired,
};

export default VenueCard;
