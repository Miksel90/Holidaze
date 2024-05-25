import { editVenue } from "../utils/editVenue";
import { useState } from "react";

/**
 * Custom hook to handle editing a venue.
 *
 * @returns {Object} The state and functions related to editing a venue.
 * @returns {Object} venue - The updated venue details.
 * @returns {boolean} isLoading - Loading state of the update process.
 * @returns {Object} error - Error object if the update fails.
 * @returns {function} updateVenue - Function to initiate the venue update process.
 * @example
 * const { venue, isLoading, error, updateVenue } = useEditVenue();
 */
export function useEditVenue() {
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Initiates the venue update process.
   *
   * @param {string} venueId - The ID of the venue to update.
   * @param {Object} venueDetails - The details of the venue to update.
   * @returns {Promise<void>}
   */
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
      }, 2500);
    }
  };

  return { venue, isLoading, error, updateVenue };
}

export default useEditVenue;
