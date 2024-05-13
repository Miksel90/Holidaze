import { BASE_URL } from "./constants";

export async function searchProfiles(searchTerm, isAuthenticated) {
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  const profileUrl = `${BASE_URL}holidaze/profiles/search?q=${encodedSearchTerm}`;

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
    const profileResponse = await fetch(profileUrl, { headers: commonHeaders });
    if (!profileResponse.ok) {
      throw new Error(
        `Failed to fetch profiles: ${profileResponse.statusText}`
      );
    }
    const profileData = await profileResponse.json();

    return profileData;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw error;
  }
}
