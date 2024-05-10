import { BASE_URL } from "./constants";

export async function searchVenues(searchTerm, isAuthenticated) {
  const encodedSearchTerm = encodeURIComponent(searchTerm);

  const profileUrl = `${BASE_URL}holidaze/profiles/search?_venues=true&_bookings=true&q=${encodedSearchTerm}`;
  const venuesUrl = `${BASE_URL}holidaze/venues/search?_owner=true&_bookings=true&q=${encodedSearchTerm}`;

  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) {
    throw new Error("API key is missing");
  }

  const accessToken = localStorage.getItem("accessToken");
  const commonHeaders = {
    "X-Noroff-API-Key": apiKey,
    "Content-Type": "application/json",
  };

  if (isAuthenticated) {
    commonHeaders.Authorization = `Bearer ${accessToken}`;
  }

  try {
    let profileData = {};
    if (isAuthenticated) {
      const profileResponse = await fetch(profileUrl, {
        headers: commonHeaders,
      });
      if (!profileResponse.ok) {
        throw new Error(
          `Failed to fetch profiles: ${profileResponse.statusText}`
        );
      }
      profileData = await profileResponse.json();
    }

    const venuesResponse = await fetch(venuesUrl, { headers: commonHeaders });
    if (!venuesResponse.ok) {
      throw new Error(`Failed to fetch venues: ${venuesResponse.statusText}`);
    }
    const venuesData = await venuesResponse.json();

    return { profileData, venuesData };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
