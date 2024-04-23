import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import defaultImage from "../../../assets/Images/defaultProfile.webp";

function ProfileCard({ profile }) {
  const [imageSrc, setImageSrc] = useState(profile.avatar.url);

  const handleImageError = () => {
    setImageSrc(defaultImage);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-2">
      <Link to={`/profiles/${encodeURIComponent(profile.name)}`}>
        <img
          src={imageSrc}
          alt={profile.avatar.alt || "Profile avatar"}
          className="w-full h-52 border-2 border-cedar rounded-sm mt-3"
          onError={handleImageError}
        />
        <div className="text-2xl font-condensed mt-5">{profile.name}</div>
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
