import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
import { useFetchProfiles } from "../../hooks/useFetchProfiles";
console.log(useFetchProfiles);

function ProfilePage() {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const { data, loading, error } = useFetchProfiles(decodedName);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No profile data found.</div>;

  return (
    <div>
      <h1 className="text-cedar">Hello, {data.name}</h1>
      <img src={data.avatar.url} alt={data.avatar.alt || "Profile avatar"} />
    </div>
  );
}

export default ProfilePage;
