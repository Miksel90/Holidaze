import { venuesUrl } from "./constants";

/**
 * Fetches a list of venues.
 *
 * @async
 * @function
 * @returns {Promise<Object[]>} The response data from the fetch venues request.
 * @throws {Error} If the fetch request fails.
 */
export async function fetchVenues() {
  const response = await fetch(`${venuesUrl}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}
