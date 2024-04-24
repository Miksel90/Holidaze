import { bookingUrl } from "./constants";

export async function bookVenue(bookingData) {
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

  // console.log("Sending Request with Headers:", headers);
  // console.log("Sending Request with Body:", bookingData);

  try {
    const response = await fetch(bookingUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(bookingData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        `Failed to book venue: ${response.status} ${response.statusText}`
      );
    }

    return responseData;
  } catch (error) {
    console.error("Error making the booking request:", error);
    throw error;
  }
}
