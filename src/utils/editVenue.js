import { BASE_URL } from "./constants";

/**
 * Edits a venue with the specified venue ID and data.
 *
 * @async
 * @function
 * @param {string} venueId - The ID of the venue to be edited.
 * @param {Object} venueData - The new data for the venue.
 * @returns {Promise<Object>} The response data from the edit venue request.
 * @throws {Error} If the API key or access token is missing, or if the edit request fails.
 */
export async function editVenue(venueId, venueData) {
  const editVenueUrl = `${BASE_URL}holidaze/venues/${venueId}`;
  const apiKey = import.meta.env.VITE_API_KEY;

  const accessToken = localStorage.getItem("accessToken");

  if (!apiKey || !accessToken) {
    throw new Error("API key or access token is missing");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "X-Noroff-API-Key": apiKey,
  };

  try {
    const response = await fetch(editVenueUrl, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(venueData),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to edit venue: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error making the edit request:", error);
    throw error;
  }
}
