import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Submitbutton from "../../Buttons/SubmitButton";
import registerUser from "./register.js";

const schema = yup
  .object({
    name: yup.string().trim().min(3).max(50).required(),
    email: yup.string().trim().email().min(3).required(),
    password: yup.string().trim().min(8).max(50).required(),
  })
  .required();

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-evenly h-full items-center"
    >
      <div className=" w-full max-w-md">
        <label
          htmlFor="userName"
          className="block text-cedar text-lg uppercase font-medium"
        >
          Username
        </label>
        <input
          {...register("name")}
          type="text"
          placeholder="Enter your name"
          id="userName"
          className="mt-1 block w-full rounded-md border-porsche border-2 shadow-sm p-3 text-cedar hover:border-cedar focus:outline-none focus:border-cedar"
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div className=" w-full max-w-md">
        <label
          htmlFor="email"
          className="block text-cedar text-lg uppercase font-medium"
        >
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="Enter your email"
          id="email"
          className="mt-1 block w-full rounded-md border-porsche border-2 shadow-sm p-3 text-cedar hover:border-cedar focus:outline-none focus:border-cedar"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div className=" w-full max-w-md">
        <label
          htmlFor="password"
          className="block text-cedar text-lg uppercase font-medium"
        >
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          placeholder="Enter your password"
          id="password"
          className="mt-1 block w-full rounded-md border-porsche border-2 shadow-sm p-3 text-cedar hover:border-cedar focus:outline-none focus:border-cedar"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <Submitbutton>Register</Submitbutton>
    </form>
  );
}

export default RegisterForm;
