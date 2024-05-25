import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * @typedef {Object} Venue
 * @property {string} id - The unique identifier for the venue.
 * @property {string} name - The name of the venue.
 * @property {string} description - The description of the venue.
 * @property {number} price - The price per night for the venue.
 * @property {number} rating - The rating of the venue.
 * @property {Object} meta - The meta information of the venue.
 * @property {Object} location - The location details of the venue.
 * @property {Array<Object>} media - The media files related to the venue.
 */

/**
 * Zustand store for managing favorite venues for the logged in user.
 */
const useFavoriteStore = create(
  persist(
    (set) => ({
      venues: [],
      favorites: [],
      setVenues: (venues) => set({ venues }),
      addFavorite: (venue) =>
        set((state) => ({
          favorites: [...state.favorites, venue],
        })),
      removeFavorite: (venueId) =>
        set((state) => ({
          favorites: state.favorites.filter((venue) => venue.id !== venueId),
        })),
    }),
    {
      name: "favorite-venues-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useFavoriteStore;
