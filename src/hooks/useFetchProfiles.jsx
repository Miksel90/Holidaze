import { useEffect, useState } from "react";
import { fetchProfiles } from "../utils/fetchProfiles";

export function useFetchProfiles(profileName = "") {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = localStorage.getItem("apiKey");
    const accessToken = localStorage.getItem("accessToken");

    if (!apiKey || !accessToken) {
      setError("API key or access token is missing");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetchProfiles(profileName) // Now correctly fetching data based on profileName
      .then((response) => {
        setProfiles(response); // Assume response itself is the data array
      })
      .catch((e) => {
        setError(e.message);
        console.error("Fetching error: ", e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [profileName]); // Correctly re-fetch when profileName changes

  return { profiles, isLoading, error };
}
