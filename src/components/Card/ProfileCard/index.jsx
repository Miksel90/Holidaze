import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function ProfileCard({ profile }) {
  return (
    <div className="flex flex-col items-center justify-center mt-2">
      <Link to={`/profiles/${encodeURIComponent(profile.name)}`}>
        <img
          src={profile.avatar.url}
          alt={profile.avatar.alt || "Profile avatar"}
          className="w-52 h-52 border-2 border-cedar rounded-sm mt-3"
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
