import { registerUrl } from "../../../utils/constants";

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

    // console.log("Response:", response);

    if (response.ok) {
      // console.log(json);
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
