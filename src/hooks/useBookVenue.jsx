import { useEffect, useState } from "react";
import { bookVenue } from "../utils/bookVenue";

export function useBookVenue() {
  const [booking, setBooking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    bookVenue()
      .then((response) => {
        setBooking(response);
        console.log("Booked venue: ", response);
      })
      .catch((e) => {
        setError(e);
        console.error("Booking error: ", e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { booking, isLoading, error };
}
