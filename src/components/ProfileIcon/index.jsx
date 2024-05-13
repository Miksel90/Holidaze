import { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { fetchProfiles } from "../../utils/fetchProfiles";

const ProfileIcon = () => {
  const [userName, setUserName] = useState("");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

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

  const handleImageError = (event) => {
    event.target.onerror = null;
    event.target.src = "";
    event.target.style.display = "none";
  };

  return (
    profile && (
      <div className="flex flex-col  gap-2 md:gap-0  items-center justify-center">
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
        <span className="  text-sm md:text-lg capitalize font-condensed">
          {profile.name || userName}
        </span>
      </div>
    )
  );
};

export default ProfileIcon;
