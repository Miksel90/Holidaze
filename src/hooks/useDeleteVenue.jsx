import { deleteVenue } from "../utils/deleteVenue";
import { useState } from "react";

/**
 * Custom hook to handle deleting a venue.
 *
 * @returns {Object} The state and functions related to deleting a venue.
 * @returns {boolean} isDeleted - Whether the venue has been deleted.
 * @returns {boolean} isLoading - Loading state of the deletion process.
 * @returns {Object} error - Error object if the deletion fails.
 * @returns {boolean} isDeleting - Whether the venue is currently being deleted.
 * @returns {function} removeVenue - Function to initiate the venue deletion process.
 * @example
 * const { isDeleted, isLoading, error, removeVenue, isDeleting } = useDeleteVenue();
 */
export function useDeleteVenue() {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * Initiates the venue deletion process.
   *
   * @param {string} venueId - The ID of the venue to delete.
   * @returns {Promise<void>}
   */
  const removeVenue = async (venueId) => {
    setIsLoading(true);
    setIsDeleting(true);
    try {
      const response = await deleteVenue(venueId);
      console.log("Delete response: ", response);
      setIsDeleted(true);
    } catch (e) {
      setError(e);
      console.error("Delete error: ", e);
    } finally {
      setIsLoading(false);
      setIsDeleting(false);
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
  };

  return { isDeleted, isLoading, error, removeVenue, isDeleting };
}

export default useDeleteVenue;
