import { useEffect, useState } from "react";
import { fetchVenues } from "../utils/fetchVenues.js";

export function useFetchVenues() {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchVenues()
      .then((json) => {
        setVenues(json.data);
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

  return { venues, isLoading, error };
}
