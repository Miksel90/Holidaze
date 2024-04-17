import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
import Submitbutton from "../../Buttons/SubmitButton";

const RegisterForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center "
    >
      <div className="mb-4 w-full max-w-md">
        <label
          htmlFor="userName"
          className="block text-cedar text-lg uppercase font-medium"
        >
          Username
        </label>
        <input
          required
          type="text"
          placeholder="Email Address"
          id="Email"
          className="mt-1 block w-full rounded-md border-porsche border-2 shadow-sm p-3 text-cedar hover:border-cedar focus:outline-none focus:border-cedar"
        />
      </div>
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
          className="mt-1 block w-full rounded-md border-porsche border-2 shadow-sm p-3 text-cedar hover:border-cedar focus:outline-none focus:border-cedar"
        />
      </div>
      <Submitbutton>Register</Submitbutton>
    </form>
  );
};

export default RegisterForm;
