import { searchVenues } from "../utils/search";
import { useEffect, useState } from "react";

/**
 * Custom hook to search for profiles and venues based on a search term.
 *
 * @param {string} searchTerm - The term to search for profiles and venues.
 * @returns {Object} The state and functions related to searching for profiles and venues.
 * @returns {Array} profiles - The list of profiles matching the search term.
 * @returns {Array} venues - The list of venues matching the search term.
 * @returns {boolean} isLoading - Loading state of the search process.
 * @returns {Object} error - Error object if the search fails.
 * @example
 * const { profiles, venues, isLoading, error } = useSearch("LaVilaJoiosa", "Ola_Nordmann");
 */
export function useSearch(searchTerm = "") {
  const [data, setData] = useState({ profiles: [], venues: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const isAuthenticated = Boolean(localStorage.getItem("accessToken"));

    if (!searchTerm.trim()) {
      setData({ profiles: [], venues: [] });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    searchVenues(searchTerm, isAuthenticated)
      .then((response) => {
        setData({
          profiles: response.profileData.data || [],
          venues: response.venuesData.data || [],
        });
      })
      .catch((e) => {
        setError(e.message);
        console.error("Fetching error: ", e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchTerm]);

  return { ...data, isLoading, error };
}
