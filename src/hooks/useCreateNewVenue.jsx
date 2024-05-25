import { createNewVenue } from "../utils/postVenue";
import { useState } from "react";

/**
 * Custom hook to handle creating a new venue.
 *
 * @returns {Object} The state and functions related to creating a new venue.
 * @returns {Object} venue - The created venue details.
 * @returns {boolean} isLoading - Loading state of the creation process.
 * @returns {Object} error - Error object if the creation fails.
 * @returns {function} createVenue - Function to initiate the venue creation process.
 * @example
 * const { venue, isLoading, error, createVenue } = useCreateNewVenue();
 */
export function useCreateNewVenue() {
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Initiates the venue creation process.
   *
   * @param {Object} venueDetails - The details of the venue to create.
   * @returns {Promise<void>}
   */
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
