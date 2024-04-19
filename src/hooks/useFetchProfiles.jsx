import { useEffect, useState } from "react";
import { fetchProfiles } from "../utils/fetchProfiles";

export function useFetchProfiles(profileName = "") {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfiles(profileName)
      .then((response) => {
        setProfiles(response);
        // console.log("Fetched profiles: ", response);
      })
      .catch((e) => {
        setError(e);
        console.error("Fetching error: ", e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [profileName]);

  return { profiles, isLoading, error };
}
