import { useState, useEffect } from "react";
import Submitbutton from "../../Buttons/SubmitButton";
import loginUser from "./login";

/**
 * LoginForm component for handling user login.
 *
 * @component
 * @example
 * return (
 *   <LoginForm />
 * )
 */
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");

  /**
   * useEffect hook to retrieve the stored username from local storage
   * and set it to the state if it exists.
   */
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  /**
   * Handles changes to the email input field.
   *
   * @param {Object} e - The event object.
   */
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  /**
   * Handles changes to the password input field.
   *
   * @param {Object} e - The event object.
   */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  /**
   * Handles form submission for user login.
   *
   * @async
   * @param {Object} e - The event object.
   * @throws {Error} Throws an error if the login process fails.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await loginUser(email, password);
      const { name, accessToken } = response.data;
      localStorage.setItem("userName", name);
      localStorage.setItem("accessToken", accessToken);
      setUserName(name);
      window.location.reload();
    } catch (loginError) {
      setError("Login failed. Please check your Email and Password.");
      console.error("Login Error:", loginError);
    }
  };

  return (
    <>
      {userName ? (
        <div className="text-cedar text-2xl mt-3 text-center">
          Welcome {userName}! You are already Logged in!{" "}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <div className="mb-4 w-full max-w-md">
            <label
              htmlFor="email"
              className="block text-cedar font-condensed text-xl capitalized font-medium"
            >
              Email
            </label>
            <input
              required
              type="text"
              placeholder="Email Address"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="mt-1 block w-full rounded-md border-porsche border-2 shadow-sm p-3 text-cedar hover:border-cedar focus:outline-none focus:border-cedar"
            />
          </div>
          <div className="mb-4 w-full max-w-md">
            <label
              htmlFor="password"
              className="block text-cedar font-condensed text-xl capitalized font-medium"
            >
              Password
            </label>
            <input
              required
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 block w-full rounded-md border-porsche border-2 shadow-sm p-3 text-cedar hover:border-cedar focus:outline-none focus:border-cedar"
            />
          </div>
          {error && (
            <div className="text-black text-2xl font-medium mb-2">{error}</div>
          )}
          <Submitbutton>Login</Submitbutton>
        </form>
      )}
    </>
  );
};

export default LoginForm;
