import { BASE_URL } from "./constants";

export async function editVenue(venueId, venueData) {
  const editVenueUrl = `${BASE_URL}holidaze/venues/${venueId}`;
  const apiKey = import.meta.env.VITE_API_KEY;

  const accessToken = localStorage.getItem("accessToken");

  if (!apiKey || !accessToken) {
    throw new Error("API key or access token is missing");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "X-Noroff-API-Key": apiKey,
  };

  try {
    const response = await fetch(editVenueUrl, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(venueData),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to edit venue: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error making the edit request:", error);
    throw error;
  }
}
