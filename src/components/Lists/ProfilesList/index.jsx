import { useState, useEffect } from "react";
import { useFetchProfiles } from "../../../hooks/useFetchProfiles";
import ProfileCard from "../../Card/ProfileCard";
import { FaFaceFrown } from "react-icons/fa6";
import Carousel from "../../Carousel";

function ProfilesList() {
  const [apiKeyExists, setApiKeyExists] = useState(false);
  const { profiles, isLoading, error } = useFetchProfiles();

  useEffect(() => {
    const apiKey = localStorage.getItem("apiKey");
    setApiKeyExists(!!apiKey);
  }, []);

  if (!apiKeyExists)
    return (
      <div className="flex flex-col justify-center items-center gap-2">
        <p className=" font-condensed text-2xl ">
          You need to log in to view managers.
        </p>
        <FaFaceFrown className="text-primary  text-8xl bg-black rounded-full border-2 border-black"></FaFaceFrown>
      </div>
    );
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <Carousel>
      {profiles
        .filter((profile) => profile.venueManager)
        .map((profile) => (
          <ProfileCard key={profile.email} profile={profile} />
        ))}
    </Carousel>
  );
}

export default ProfilesList;
