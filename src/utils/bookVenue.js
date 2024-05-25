import { bookingUrl } from "./constants";

/**
 * Books a venue with the provided booking data.
 *
 * @async
 * @function
 * @param {Object} bookingData - The data for booking the venue.
 * @returns {Promise<Object>} The response data from the booking request.
 * @throws {Error} If the API key or access token is missing, or if the booking request fails.
 */
export async function bookVenue(bookingData) {
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
    const response = await fetch(bookingUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(bookingData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        `Failed to book venue: ${response.status} ${response.statusText}`
      );
    }

    return responseData;
  } catch (error) {
    console.error("Error making the booking request:", error);
    throw error;
  }
}
