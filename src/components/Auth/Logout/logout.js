export function logoutUser() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("apiKey");

  window.location.href = "/";
}
