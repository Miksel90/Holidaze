import { createApi } from "../../../utils/constants";

export async function fetchApiKey(accessToken, keyName) {
  const url = createApi;
  const headers = new Headers({
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ name: keyName }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.key;
  } catch (error) {
    console.error("Failed to fetch API key:", error);
    throw error;
  }
}
