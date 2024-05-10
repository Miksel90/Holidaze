import { useEffect, useState } from "react";
import { fetchProfiles } from "../utils/fetchProfiles";

export function useFetchProfiles(profileName = "") {
  const [profiles, setProfiles] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = localStorage.getItem("apiKey");
    if (!apiKey) {
      setError("API key is missing");
      setIsLoading(false);
      setProfiles({ data: [] });
      return;
    }

    setIsLoading(true);
    fetchProfiles(profileName)
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
  }, [profileName]);

  return { profiles, isLoading, error };
}
