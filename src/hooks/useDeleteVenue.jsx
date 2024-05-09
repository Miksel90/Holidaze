import { deleteVenue } from "../utils/deleteVenue";
import { useState } from "react";

export function useDeleteVenue() {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
