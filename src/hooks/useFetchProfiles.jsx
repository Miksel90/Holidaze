import { useEffect, useState } from "react";
import { fetchProfiles } from "../utils/fetchProfiles.js";

export function useFetchProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchProfiles()
      .then((json) => {
        setProfiles(json.data);
        console.log(json);
      })
      .catch((e) => {
        setError(e.message);
        console.error("Fetching error: ", e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { profiles, isLoading, error };
}
