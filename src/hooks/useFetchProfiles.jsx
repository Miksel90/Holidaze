import { useEffect, useState } from "react";
import { fetchProfiles } from "../utils/fetchProfiles";

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
        // console.log("Profiles response: ", response);
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
