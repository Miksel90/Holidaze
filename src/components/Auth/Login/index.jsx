import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DefaultButton from "../../Buttons/Button";
import loginUser from "./login";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      const { name, accessToken } = response.data;
      localStorage.setItem("userName", name);
      localStorage.setItem("accessToken", accessToken);
      //   console.log("Login successful", response);
      setError("");
      navigate("/profile");
    } catch (error) {
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center "
    >
      <div className="mb-4 w-full max-w-md">
        <label
          htmlFor="email"
          className="block text-cedar text-lg uppercase font-medium"
        >
          Email:
        </label>
        <input
          required
          type="text"
          placeholder="Email Address"
          id="Email"
          value={email}
          onChange={handleEmailChange}
          className="mt-1 block w-full rounded-md border-porsche border-2 shadow-sm p-3 text-cedar hover:border-cedar focus:outline-none focus:border-cedar"
        />
      </div>
      <div className="mb-4 w-full max-w-md">
        <label
          htmlFor="password"
          className="block text-cedar text-lg uppercase font-medium"
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
      {error && <div className="text-black text-lg mb-2">{error}</div>}
      <DefaultButton>Login</DefaultButton>
    </form>
  );
};

export default LoginForm;
