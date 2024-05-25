import { useState, useEffect } from "react";
import { useFetchProfiles } from "../../../hooks/useFetchProfiles";
import ProfileCard from "../../Card/ProfileCard";
import { FaFaceFrown } from "react-icons/fa6";
import Carousel from "../../Carousel";

/**
 * ProfilesList component that displays a list of profiles in a carousel if the user is logged in.
 *
 * @component
 * @example
 * return (
 *   <ProfilesList />
 * )
 */
function ProfilesList() {
  const [accessTokenExists, setAccessTokenExists] = useState(null);
  const { profiles, isLoading, error } = useFetchProfiles();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setAccessTokenExists(!!accessToken);
  }, []);

  if (!accessTokenExists)
    return (
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="font-condensed text-2xl">
          You need to log in to view managers.
        </p>
        <FaFaceFrown className="text-primary text-8xl bg-black rounded-full border-2 border-black" />
      </div>
    );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!profiles || !profiles.data || profiles.data.length === 0) {
    return <p>No venue managers found.</p>;
  }

  const filteredProfiles = profiles.data.filter(
    (profile) => profile.venueManager
  );

  if (filteredProfiles.length === 0) {
    return <p>No venue managers found.</p>;
  }

  return (
    <Carousel>
      {filteredProfiles.map((profile) => (
        <ProfileCard key={profile.email} profile={profile} />
      ))}
    </Carousel>
  );
}

export default ProfilesList;
