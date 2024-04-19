import { useParams } from "react-router-dom";
import { useFetchProfiles } from "../../hooks/useFetchProfiles";

function ProfilePage() {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const { profiles, isLoading, error } = useFetchProfiles(decodedName);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!profiles || !profiles.data) return <div>No profile data found.</div>;

  const profileData = profiles.data;

  return (
    <div>
      <h1 className="text-cedar">Hello, {profileData.name}</h1>
      <img
        src={profileData.avatar.url}
        alt={profileData.avatar.alt || "Profile avatar"}
      />
    </div>
  );
}

export default ProfilePage;
