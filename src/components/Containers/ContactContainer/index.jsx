import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SubmitButton from "../../Buttons/SubmitButton";

const schema = yup
  .object({
    name: yup
      .string()
      .required("Name is required")
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name can be up to 50 characters"),
    email: yup
      .string()
      .required("Email is required")
      .trim()
      .email("Enter a valid email")
      .min(3, "Email must be at least 3 characters"),
    subject: yup
      .string()
      .required("Subject is required")
      .trim()
      .min(3, "Subject must be at least 3 characters")
      .max(30, "Subject can be up to 30 characters"),
    message: yup
      .string()
      .required("Message is required")
      .trim()
      .min(10, "Message must be at least 10 characters")
      .max(200, "Message can be up to 200 characters"),
  })
  .required();

function ContactSchema() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    reset();
    setIsSubmitted(true);
  };

  return (
    <div className="">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            {...register("name")}
            className="mt-1 block w-full rounded-md border-porsche border-2 shadow-sm p-3 text-cedar hover:border-cedar focus:outline-none focus:border-cedar"
          />
          <p className="text-danger text-lg font-sans">
            {errors.name?.message}
          </p>

          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            {...register("email")}
            className="mt-1 block w-full rounded-md border-porsche border-2 shadow-sm p-3 text-cedar hover:border-cedar focus:outline-none focus:border-cedar"
          />
          <p className="text-danger text-lg font-sans">
            {errors.email?.message}
          </p>

          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            {...register("subject")}
            className="mt-1 block w-full rounded-md border-porsche border-2 shadow-sm p-3 text-cedar hover:border-cedar focus:outline-none focus:border-cedar"
          />
          <p className="text-danger text-lg font-sans">
            {errors.subject?.message}
          </p>

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            {...register("message")}
            className="mt-1 block w-full rounded-md border-porsche border-2 shadow-sm p-3 text-cedar hover:border-cedar focus:outline-none focus:border-cedar"
          />
          <p className="text-danger text-lg font-sans">
            {errors.message?.message}
          </p>
          <div className="mt-2 text-center">
            {" "}
            <SubmitButton>Send</SubmitButton>
          </div>
        </form>
      ) : (
        <p className="text-3xl text-success mt-2 font-condensed ">
          Your message has been sent. Please wait for our reply.
        </p>
      )}
    </div>
  );
}

export default ContactSchema;
