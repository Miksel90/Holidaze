import { useEffect, useState } from "react";
import { fetchProfiles } from "../utils/fetchProfiles";

/**
 * Custom hook to fetch profiles.
 *
 * @param {string} profileName - The name of the profile to fetch.
 * @param {boolean} isSearch - Flag to indicate if this is a search operation.
 * @returns {Object} The state and functions related to fetching profiles.
 * @returns {Object} profiles - The fetched profiles data.
 * @returns {boolean} isLoading - Loading state of the fetch process.
 * @returns {Object} error - Error object if the fetch fails.
 * @example
 * const { profiles, isLoading, error } = useFetchProfiles("Ola_Nordmann", true);
 */
export function useFetchProfiles(profileName = "", isSearch = false) {
  const [profiles, setProfiles] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;

    if (!apiKey) {
      setError("API key is missing");
      setIsLoading(false);
      setProfiles({ data: [] });
      return;
    }

    setIsLoading(true);
    fetchProfiles(profileName, isSearch)
      .then((response) => {
        setProfiles(response);
      })
      .catch((e) => {
        setError(e.message);
        console.error("Fetching error: ", e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [profileName, isSearch]);

  return { profiles, isLoading, error };
}
