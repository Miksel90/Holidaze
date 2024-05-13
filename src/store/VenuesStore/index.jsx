// store/VenuesStore.js
import { create } from "zustand";
import { fetchAndUpdateVenues } from "../../utils/fetchVenues";

const useVenueStore = create((set) => ({
  venues: [],
  isLoading: false,
  error: null,

  fetchVenues: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchAndUpdateVenues();
      console.log("Fetch response:", response); // Log the response from the fetch

      if (response && response.data && Array.isArray(response.data)) {
        set({ venues: response.data, isLoading: false });
      } else {
        set({ error: "Invalid data format", venues: [], isLoading: false });
        console.log("Setting error due to invalid format or no data");
      }
    } catch (error) {
      set({ error: error.message, isLoading: false, venues: [] });
      console.error("Error fetching venues:", error);
    }
  },
}));
export default useVenueStore;
