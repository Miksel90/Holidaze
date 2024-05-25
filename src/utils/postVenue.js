/**
 * Creates a new venue with the provided data.
 *
 * @async
 * @function
 * @param {Object} newVenueData - The data for the new venue to be created.
 * @returns {Promise<Object>} The response data from the create new venue request.
 * @throws {Error} If the API key or access token is missing, or if the create request fails.
 */
export async function createNewVenue(newVenueData) {
  const venueUrl = "https://v2.api.noroff.dev/holidaze/venues";
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
    const response = await fetch(venueUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newVenueData),
    });

    const responseData = await response.json();

    console.log(" Response:", responseData);

    if (!response.ok) {
      console.error("API Error Response:", responseData);
      throw new Error(
        `Failed to create new venue: ${response.status} ${
          response.statusText
        } - ${JSON.stringify(responseData)}`
      );
    }

    return responseData;
  } catch (error) {
    console.error("Could not post venue:", error);
    throw error;
  }
}
