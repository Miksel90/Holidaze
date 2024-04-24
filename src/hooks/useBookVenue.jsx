import { useState } from "react";
import { bookVenue } from "../utils/bookVenue";

export function useBookVenue() {
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const initiateBooking = async (bookingDetails) => {
    setIsLoading(true);
    try {
      const response = await bookVenue(bookingDetails);
      console.log("Booking response: ", response);

      setBooking(response);
    } catch (e) {
      setError(e);
      console.error("Booking error: ", e);
    } finally {
      setIsLoading(false);
    }
  };

  return { booking, isLoading, error, initiateBooking };
}
