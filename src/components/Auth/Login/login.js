/**
 * @module loginUser
 * @description This module provides a function to log in a user by sending a POST request to the login URL.
 */

import { loginUrl } from "../../../utils/constants";

/**
 * Logs in a user by sending a POST request with the provided email and password.
 *
 * @async
 * @function loginUser
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} The response data from the server if the login is successful.
 * @throws {Error} Throws an error if the login fails.
 */
async function loginUser(email, password) {
  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Login failed");
  }
}

export default loginUser;
