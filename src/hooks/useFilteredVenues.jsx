import { useMemo } from "react";
import useVenueStore from "../store/VenuesStore"; // Ensure this path is correct!

export const useFilteredVenues = (searchTerm) => {
  const venues = useVenueStore((state) => state.venues);
  console.log("Venues inside useFilteredVenues:", venues); // Log venues from the store

  const filteredVenues = useMemo(() => {
    return venues
      ? venues.filter((venue) =>
          venue.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];
  }, [venues, searchTerm]);

  console.log("Filtered venues:", filteredVenues); // Log filtered venues

  return filteredVenues;
};

export default useFilteredVenues;
