import { fetchSingleVenue } from "../utils/fetchSingleVenue";
import { useEffect, useState } from "react";

/**
 * Custom hook to fetch a single venue by its ID.
 *
 * @param {string} venueId - The ID of the venue to fetch.
 * @returns {Object} The state and functions related to fetching a single venue.
 * @returns {Object} venue - The fetched venue data.
 * @returns {boolean} isLoading - Loading state of the fetch process.
 * @returns {Object} error - Error object if the fetch fails.
 * @example
 * const { venue, isLoading, error } = useFetchSingleVenue("Vilajoyhosa123");
 */
export function useFetchSingleVenue(venueId) {
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchSingleVenue(venueId)
      .then((response) => {
        setVenue(response.data);
      })
      .catch((e) => {
        setError(e.message);
        console.error("Fetching error:", e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [venueId]);

  return { venue, isLoading, error };
}
