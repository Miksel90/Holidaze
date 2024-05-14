import { deleteBooking } from "../utils/deleteBooking.js";
import { useState } from "react";

export function useDeleteBooking() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState(null);
  const [deletingBookingId, setDeletingBookingId] = useState(null);
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
