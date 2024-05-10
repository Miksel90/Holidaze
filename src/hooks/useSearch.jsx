import { searchVenues } from "../utils/search";
import { useEffect, useState } from "react";

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
        console.log("Search results: ", response);
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
