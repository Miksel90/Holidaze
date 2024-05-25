import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SubmitButton from "../../Buttons/SubmitButton";
import registerUser from "./register.js";

const schema = yup
  .object({
    name: yup.string().trim().min(3).max(50).required("Name is required."),
    email: yup
      .string()
      .trim()
      .email("Invalid email format.")
      .matches(
        /^[A-Za-z0-9._%+-]+@stud\.noroff\.no$/,
        "Email must be a stud.noroff.no email"
      )
      .required("Email is required."),
    password: yup
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters.")
      .max(50, "Password cannot be longer than 30 characters.")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .matches(/[0-9]/, "Password must contain at least one number.")
      .required("Password is required."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required."),
  })
  .required();

/**
 * RegisterForm component for handling user registration.
 *
 * @component
 * @example
 * return (
 *   <RegisterForm />
 * )
 */
function RegisterForm() {
  const [buttonText, setButtonText] = useState("Register");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const navigate = useNavigate();

  /**
   * Handles form submission for user registration.
   *
   * @async
   * @param {Object} data - The form data.
   * @throws {Error} Throws an error if the registration process fails.
   */
  const onSubmit = async (data) => {
    try {
      setButtonText("Registering...");
      await registerUser(data);
      setButtonText("Registered");
      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      alert(error.message);
      setButtonText("Register");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-evenly gap-4 items-center"
    >
      <div className=" w-full max-w-md">
        <label
          htmlFor="userName"
          className="block text-cedar font-condensed text-xl capitalized font-medium"
        >
          Username
        </label>
        <input
          {...register("name")}
          type="text"
          required
          placeholder="Enter your name"
          id="userName"
          className="mt-1 block w-full rounded-md border-porsche border-2 shadow-sm p-3 text-cedar hover:border-cedar focus:outline-none focus:border-cedar"
        />
        {errors.name && (
          <p className="text-danger mt-2 bg-white px-4 py-2 rounded-md text-lg font-medium text-center">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className=" w-full max-w-md">
        <label
          htmlFor="email"
          className="block text-cedar font-condensed text-xl capitalized font-medium"
        >
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          required
          placeholder="Enter your email"
          id="email"
          className="mt-1 block w-full rounded-md border-porsche border-2 shadow-sm p-3 text-cedar hover:border-cedar focus:outline-none focus:border-cedar"
        />
        {errors.email && (
          <p className="text-danger mt-2 bg-white px-4 py-2 rounded-md text-lg font-medium text-center">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className=" w-full max-w-md">
        <label
          htmlFor="password"
          className="block text-cedar font-condensed text-xl capitalized font-medium"
        >
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          required
          placeholder="Enter your password"
          id="password"
          className="mt-1 mb-2 block w-full rounded-md border-porsche border-2 shadow-sm p-3 text-cedar hover:border-cedar focus:outline-none focus:border-cedar"
        />
        {errors.password && (
          <p className="text-danger mt-2 bg-white px-4 py-2 rounded-md text-lg font-medium text-center">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className=" w-full max-w-md">
        <label
          htmlFor="confirmPassword"
          className="block text-cedar font-condensed text-xl capitalized font-medium"
        >
          Confirm Password
        </label>
        <input
          {...register("confirmPassword")}
          type="password"
          required
          placeholder="Confirm your password"
          id="confirmPassword"
          className="mt-1 mb-2 block w-full rounded-md border-porsche border-2 shadow-sm p-3 text-cedar hover:border-cedar focus:outline-none focus:border-cedar"
        />
        {errors.confirmPassword && (
          <p className="text-danger mt-2 bg-white px-4 py-2 rounded-md text-lg font-medium text-center">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <SubmitButton disabled={!isValid}>{buttonText}</SubmitButton>
    </form>
  );
}

export default RegisterForm;
