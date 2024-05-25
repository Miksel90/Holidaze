import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import defaultImage from "../../../assets/Images/defaultProfile.webp";

/**
 * ProfileCard component that displays a user's profile picture and name.
 *
 * @component
 * @param {Object} props - The props for ProfileCard.
 * @param {Object} props.profile - The profile object containing user details.
 * @param {string} props.profile.name - The name of the user.
 * @param {Object} props.profile.avatar - The avatar object containing the image URL and alt text.
 * @param {string} props.profile.avatar.url - The URL of the avatar image.
 * @param {string} [props.profile.avatar.alt] - The alt text for the avatar image.
 * @example
 * };
 * return (
 *   <ProfileCard profile={profile} />
 * )
 */
function ProfileCard({ profile }) {
  const [imageSrc, setImageSrc] = useState(profile.avatar.url);

  /**
   * Handles the error event when the image fails to load and sets a default image.
   */
  const handleImageError = () => {
    setImageSrc(defaultImage);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-2">
      <Link to={`/profiles/${encodeURIComponent(profile.name)}`}>
        <img
          src={imageSrc}
          alt={profile.avatar.alt || "Profile avatar"}
          style={{ height: "300px", width: "300px" }}
          className="object-cover w-full rounded-full"
          onError={handleImageError}
        />
        <div className="text-2xl font-condensed py-2">{profile.name}</div>
      </Link>
    </div>
  );
}

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default ProfileCard;
