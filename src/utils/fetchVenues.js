import { venuesUrl } from "./constants";

// fetchVenues.js

export async function fetchAndUpdateVenues() {
  try {
    const response = await fetch(venuesUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch venues");
    }
    const data = await response.json();
    console.log("Fetched venues:", data); // Log the fetched data
    return data;
  } catch (error) {
    throw new Error("Failed to fetch venues: " + error.message);
  }
}
