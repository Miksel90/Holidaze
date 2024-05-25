import { BASE_URL } from "./constants";

/**
 * Deletes a booking with the specified booking ID.
 *
 * @async
 * @function
 * @param {string} bookingId - The ID of the booking to be deleted.
 * @returns {Promise<Response>} The response from the delete booking request.
 * @throws {Error} If the API key or access token is missing, or if the delete booking request fails.
 */
export async function deleteBooking(bookingId) {
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
    const response = await fetch(`${BASE_URL}holidaze/bookings/${bookingId}`, {
      method: "DELETE",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete booking: ${response.status} ${response.statusText}`
      );
    }

    return response;
  } catch (error) {
    console.error("Error making the delete booking request:", error);
    throw error;
  }
}
