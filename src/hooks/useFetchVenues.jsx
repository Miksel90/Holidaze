import { useEffect, useState } from "react";
import { fetchVenues } from "../utils/fetchVenues.js";
import saveFavoriteVenue from "../store/FavoriteStore/index.jsx";

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
