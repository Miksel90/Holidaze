import { venuesUrl } from "./constants";

export async function fetchVenues() {
  const response = await fetch(`${venuesUrl}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}
