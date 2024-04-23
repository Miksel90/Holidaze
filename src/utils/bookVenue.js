import { bookingUrl } from "./constants";

export async function bookVenue() {
  const response = await fetch(`${bookingUrl}`);
  if (!response.ok) {
    throw new Error("Failed to book venue");
  }
  return response.json();
}
