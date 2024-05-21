import { fetchSingleVenue } from "../utils/fetchSingleVenue";
import { useEffect, useState } from "react";

export function useFetchSingleVenue(venueId) {
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchSingleVenue(venueId)
      .then((response) => {
        // console.log("Venue response:", response);
        setVenue(response.data);
      })
      .catch((e) => {
        setError(e.message);
        console.error("Fetching error:", e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [venueId]);

  return { venue, isLoading, error };
}
