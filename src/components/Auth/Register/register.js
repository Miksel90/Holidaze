import { registerUrl } from "../../../utils/constants";

/**
 * Registers a new user by sending a POST request with the provided user data.
 *
 * @async
 * @function RegisterUser
 * @param {Object} userData - The data of the user to be registered.
 * @param {string} userData.name - The name of the user.
 * @param {string} userData.email - The email of the user.
 * @param {string} userData.password - The password of the user.
 * @returns {Promise<Object>} The response data from the server if the registration is successful.
 * @throws {Error} Throws an error if the registration process fails.
 */
async function RegisterUser(userData) {
  const postData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch(registerUrl, postData);
    const json = await response.json();

    if (response.ok) {
      return json;
    } else {
      throw new Error(json.message || "Registration failed.");
    }
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

export default RegisterUser;
