import { profilesUrl } from "./constants";

export async function fetchProfiles() {
  const apiKey = localStorage.getItem("apiKey");
  const accessToken = localStorage.getItem("accessToken");

  if (!apiKey) {
    throw new Error("API key is missing from localStorage");
  }
  if (!accessToken) {
    throw new Error("Access token is missing from localStorage");
  }

  const headers = {
    "X-Noroff-API-Key": apiKey,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(profilesUrl, { headers });
  if (!response.ok) {
    throw new Error("Failed to fetch profiles");
  }
  return response.json();
}
