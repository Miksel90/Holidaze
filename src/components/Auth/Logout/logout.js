/**
 * Logs out the user by removing user-related information from local storage and redirecting to the homepage.
 *
 * @function logoutUser
 */
export function logoutUser() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");

  window.location.href = "/";
}
