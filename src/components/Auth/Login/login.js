const BASE_URL = "https://v2.api.noroff.dev/";
const loginUrl = `${BASE_URL}auth/login`;

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
