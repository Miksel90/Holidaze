import { useEffect, useState } from "react";
import { fetchVenues } from "../utils/fetchVenues.js";
import saveFavoriteVenue from "../store/FavoriteStore/index.jsx";

/**
 * Custom hook to fetch a list of venues.
 *
 * @returns {Object} The state and functions related to fetching venues.
 * @returns {Array} venues - The fetched list of venues.
 * @returns {boolean} isLoading - Loading state of the fetch process.
 * @returns {Object} error - Error object if the fetch fails.
 * @example
 * const { venues, isLoading, error } = useFetchVenues();
 */
export function useFetchVenues() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const setVenues = saveFavoriteVenue((state) => state.setVenues);
  const venues = saveFavoriteVenue((state) => state.venues);

  useEffect(() => {
    setIsLoading(true);
    fetchVenues()
      .then((json) => {
        setVenues(json.data);
      })
      .catch((e) => {
        setError(e.message);
        console.error("Fetching error: ", e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setVenues]);

  return { venues, isLoading, error };
}
