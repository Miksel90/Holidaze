import { BASE_URL } from "./constants";

/**
 * Fetches a single venue by its ID with owner and bookings parameters.
 *
 * @async
 * @function
 * @param {string} [id=""] - The ID of the venue to fetch.
 * @returns {Promise<Object>} The response data from the fetch single venue request.
 * @throws {Error} If the fetch request fails.
 */
export async function fetchSingleVenue(id = "") {
  const SingleVenueURL = `${BASE_URL}holidaze/venues/${id}?_owner=true&_bookings=true`;

  const response = await fetch(`${SingleVenueURL}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}
