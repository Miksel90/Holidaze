import { useState, useEffect } from "react";
import { useFilteredVenues } from "../hooks/useFilteredVenues";
import { searchProfiles } from "../utils/search"; // Import searchProfiles

import useVenueStore from "../store/VenuesStore"; // Import the store

export function useSearch(searchTerm = "") {
  const [profiles, setProfiles] = useState([]);
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const isAuthenticated = Boolean(localStorage.getItem("accessToken"));
  const filteredVenues = useFilteredVenues(searchTerm);
  const fetchVenues = useVenueStore((state) => state.fetchVenues); // Fetch venues action from the store

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      searchProfiles(searchTerm, isAuthenticated), // Fetch profiles
      fetchVenues(), // Fetch venues from the store
    ])
      .then(([profileData, venueData]) => {
        console.log("Fetched profiles:", profileData); // Log fetched profiles
        console.log("Fetched venues:", venueData); // Log fetched venues
        setProfiles((profileData && profileData.data) || []);
        setVenues((venueData && venueData.data) || []); // Set venues state
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        console.error("Fetching error: ", e);
        setIsLoading(false);
      });
  }, [searchTerm, isAuthenticated, fetchVenues]);

  return { profiles, venues, filteredVenues, isLoading, error };
}
