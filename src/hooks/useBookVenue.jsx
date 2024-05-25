import { useState } from "react";
import { bookVenue } from "../utils/bookVenue";

/**
 * Custom hook to handle booking a venue.
 *
 * @returns {Object} The state and functions related to booking a venue.
 * @returns {Object} booking - The booking details.
 * @returns {boolean} isLoading - Loading state of the booking process.
 * @returns {Object} error - Error object if the booking fails.
 * @returns {function} initiateBooking - Function to initiate the booking process.
 * @example
 * const { booking, isLoading, error, initiateBooking } = useBookVenue();
 */
export function useBookVenue() {
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Initiates the booking process.
   *
   * @param {Object} bookingDetails - The details of the booking.
   * @returns {Promise<void>}
   */
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
