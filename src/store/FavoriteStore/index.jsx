import { create } from "zustand";
import { persist } from "zustand/middleware";

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
