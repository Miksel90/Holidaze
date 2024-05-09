import { editVenue } from "../utils/editVenue";
import { useState } from "react";

export function useEditVenue() {
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const updateVenue = async (venueId, venueDetails) => {
    setIsUpdating(true);
    try {
      const response = await editVenue(venueId, venueDetails);
      console.log("Venue response: ", response);

      setVenue(response);
    } catch (e) {
      setError(e);
      console.error("Venue error: ", e);
    } finally {
      setIsUpdating(false);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  return { venue, isLoading, error, updateVenue };
}

export default useEditVenue;
