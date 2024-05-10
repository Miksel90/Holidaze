export async function fetchProfiles(name = "") {
  const profilesUrl = `https://v2.api.noroff.dev/holidaze/profiles/${name}?_venues=true&_bookings=true`;

  const apiKey = import.meta.env.VITE_API_KEY;

  if (!apiKey) {
    throw new Error("API key is missing");
  }

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error(
      "Access token is missing from localStorage. A token will be generated when you log in."
    );
  }

  const headers = {
    "X-Noroff-API-Key": apiKey,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(profilesUrl, { headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch profiles: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Network error: ${error.message}`);
  }
}
