export async function createNewVenue(newVenueData) {
  const venueUrl = "https://v2.api.noroff.dev/holidaze/venues";
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
    const response = await fetch(venueUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newVenueData),
    });

    const responseData = await response.json();

    console.log("Full API Response:", responseData);

    if (!response.ok) {
      console.error("API Error Response:", responseData);
      throw new Error(
        `Failed to create new venue: ${response.status} ${
          response.statusText
        } - ${JSON.stringify(responseData)}`
      );
    }

    return responseData;
  } catch (error) {
    console.error("Could not post venue:", error);
    throw error;
  }
}
