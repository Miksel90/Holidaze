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
