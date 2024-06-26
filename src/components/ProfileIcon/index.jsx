import { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { fetchProfiles } from "../../utils/fetchProfiles";

/**
 * ProfileIcon component that displays the user's profile icon and name.
 *
 * @component
 * @example
 * return (
 *   <ProfileIcon />
 * )
 */
const ProfileIcon = () => {
  const [userName, setUserName] = useState("");
  const [profile, setProfile] = useState(null);

  /**
   * Fetches the username from localStorage on component mount.
   */
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  /**
   * Fetches the profile data for the logged-in user.
   */
  useEffect(() => {
    if (userName) {
      fetchProfiles(userName)
        .then((response) => {
          if (response && response.data) {
            setProfile(response.data);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch profile", error);
        });
    }
  }, [userName]);

  /**
   * Handles errors when loading the profile image.
   *
   * @param {Object} event - The event object.
   */
  const handleImageError = (event) => {
    event.target.onerror = null;
    event.target.src = "";
    event.target.style.display = "none";
  };

  return (
    profile && (
      <div className="flex flex-col gap-2 md:gap-0 items-center justify-center">
        <Link
          to={`/profiles/${encodeURIComponent(userName)}`}
          className="no-underline hover:underline"
          aria-label="View profile"
        >
          {profile.avatar && profile.avatar.url ? (
            <img
              src={profile.avatar.url}
              alt={profile.avatar.alt || "User avatar"}
              className="text-4xl md:text-6xl text-cedar rounded-full w-8 h-8 md:w-24 md:h-24 object-cover shadow-cedar shadow-md"
              onError={handleImageError}
            />
          ) : (
            <CgProfile className="text-4xl md:text-6xl text-cedar" />
          )}
        </Link>
        <span className="text-sm md:text-lg capitalize font-condensed">
          {profile.name || userName}
        </span>
      </div>
    )
  );
};

export default ProfileIcon;
