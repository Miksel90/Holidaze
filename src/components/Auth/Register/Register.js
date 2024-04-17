import { registerUrl } from "../../../utils/constants";
console.log(registerUrl);

async function registerUser(registerURL, userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch(registerURL, postData);
    console.log(response);
    const json = await response.json();

    if (response.ok) {
      console.log(json);
    }
  } catch (error) {
    console.log(error);
  }
}

export default registerUser;
