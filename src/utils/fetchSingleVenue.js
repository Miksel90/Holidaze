import { BASE_URL } from "./constants";

export async function fetchSingleVenue(id = "") {
  const SingleVenueURL = `${BASE_URL}holidaze/venues/${id}?_owner=true&_bookings=true`;

  const response = await fetch(`${SingleVenueURL}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}
