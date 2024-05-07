import { createNewVenue } from "../utils/postVenue";
import { useState } from "react";

export function useCreateNewVenue() {
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createVenue = async (venueDetails) => {
    setIsLoading(true);
    try {
      const response = await createNewVenue(venueDetails);
      console.log("Venue response: ", response);

      setVenue(response);
    } catch (e) {
      setError(e);
      console.error("Venue error: ", e);
    } finally {
      setIsLoading(false);
    }
  };

  return { venue, isLoading, error, createVenue };
}

export default useCreateNewVenue;
