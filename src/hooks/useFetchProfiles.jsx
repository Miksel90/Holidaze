import { useEffect, useState } from "react";
import { fetchProfiles } from "../utils/fetchProfiles";

export function useFetchProfiles(profileName = "") {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = localStorage.getItem("apiKey");
    if (!apiKey) {
      setIsLoading(false);
      return; // Early return if no API key
    }

    setIsLoading(true);
    fetchProfiles(profileName, apiKey) // Assuming fetchProfiles can accept an apiKey
      .then((response) => {
        setProfiles(response.data);
        // console.log("Fetched profiles: ", response.data);
      })
      .catch((e) => {
        setError(e.message);
        console.error("Fetching error: ", e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [profileName]);

  return { profiles, isLoading, error };
}
