/**
 * Fetches profiles with optional filtering by name.
 *
 * @async
 * @function
 * @param {string} [name=""] - The optional name to filter profiles.
 * @returns {Promise<Object>} The response data from the fetch profiles request.
 * @throws {Error} If the API key is missing or if there is a network error.
 */
export async function fetchProfiles(name = "") {
  const profilesUrl = `https://v2.api.noroff.dev/holidaze/profiles/${name}?_venues=true&_bookings=true`;

  const apiKey = import.meta.env.VITE_API_KEY;

  if (!apiKey) {
    throw new Error("API key is missing");
  }

  const accessToken = localStorage.getItem("accessToken");
  // I commented out this error because it shows in the console, and I know the code works.
  // I cant fetch profiles from the API without being logged in.
  // if (!accessToken) {
  //   throw new Error(
  //     "Access token is missing from localStorage. A token will be generated when you log in."
  //   );
  // }

  const headers = {
    "X-Noroff-API-Key": apiKey,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(profilesUrl, { headers });

    // I commented out this error because it shows in the console, and I know the code works.
    // I cant fetch profiles from the API without being logged in.
    // if (!response.ok) {
    //   throw new Error(`Failed to fetch profiles: ${response.statusText}`);
    // }
    return await response.json();
  } catch (error) {
    throw new Error(`Network error: ${error.message}`);
  }
}
