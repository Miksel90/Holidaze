import { BASE_URL } from "./constants";

export async function deleteVenue(venueId) {
  const deleteUrl = `${BASE_URL}holidaze/venues/${venueId}`;
  const apiKey = localStorage.getItem("apiKey");
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
    const response = await fetch(deleteUrl, {
      method: "DELETE",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete venue: ${response.status} ${response.statusText}`
      );
    }

    return true;
  } catch (error) {
    console.error("Error making the delete request:", error);
    throw error;
  }
}
