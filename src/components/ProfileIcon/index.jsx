import { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const ProfileIcon = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    userName && (
      <div className="flex items-center justify-center">
        <Link
          to="/profile"
          className="no-underline hover:underline"
          aria-label="View profile"
        >
          <CgProfile className="text-4xl md:text-6xl text-cedar" />
        </Link>
      </div>
    )
  );
};

export default ProfileIcon;
