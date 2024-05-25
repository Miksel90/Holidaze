import { BASE_URL } from "./constants";

/**
 * Updates the profile information for the authenticated user.
 *
 * @async
 * @function
 * @param {Object} profileData - The updated profile data.
 * @returns {Promise<Object>} The response data from the update profile info request.
 * @throws {Error} If the access token, API key, or update request fails.
 */
export async function updateProfileInfo(profileData) {
  const accessToken = localStorage.getItem("accessToken");
  const userName = localStorage.getItem("userName");
  const apiKey = import.meta.env.VITE_API_KEY;

  if (!accessToken || !apiKey) {
    throw new Error("Access token or API key is missing");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "X-Noroff-API-Key": apiKey,
  };

  try {
    const response = await fetch(`${BASE_URL}holidaze/profiles/${userName}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(profileData),
    });

    const responseData = await response.json();

    console.log("Response:", responseData);

    if (!response.ok) {
      throw new Error(
        `Failed to update profile info: ${response.status} ${response.statusText}`
      );
    }

    return responseData;
  } catch (error) {
    console.error("Error updating profile info:", error);
    throw error;
  }
}
