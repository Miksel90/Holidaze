import { deleteBooking } from "../utils/deleteBooking.js";
import { useState } from "react";

/**
 * Custom hook to handle deleting a booking.
 *
 * @returns {Object} The state and functions related to deleting a booking.
 * @returns {boolean} isDeleting - Loading state of the deletion process.
 * @returns {boolean} isDeleted - Whether the booking has been deleted.
 * @returns {Object} error - Error object if the deletion fails.
 * @returns {string} deletingBookingId - The ID of the booking being deleted.
 * @returns {function} removeBooking - Function to initiate the booking deletion process.
 * @example
 * const { isDeleting, isDeleted, deletingBookingId, error, removeBooking } = useDeleteBooking();
 */
export function useDeleteBooking() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState(null);
  const [deletingBookingId, setDeletingBookingId] = useState(null);

  /**
   * Initiates the booking deletion process.
   *
   * @param {string} bookingId - The ID of the booking to delete.
   * @returns {Promise<void>}
   */
  const removeBooking = async (bookingId) => {
    setIsDeleting(true);
    setDeletingBookingId(bookingId);
    try {
      await deleteBooking(bookingId);
      setIsDeleted(true);
      console.log("Booking deleted");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (e) {
      setError(e);
      console.error("Booking error: ", e);
    } finally {
      setIsDeleting(false);
      setDeletingBookingId(null);
    }
  };

  return { isDeleting, isDeleted, deletingBookingId, error, removeBooking };
}

export default useDeleteBooking;
