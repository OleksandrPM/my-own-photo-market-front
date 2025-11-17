"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "lib/forms/schemas";

export interface SignUpValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <label>Username</label>
      <input
        type="text"
        placeholder="username"
        {...register("username", { required: true })}
      />
      <p>{errors.username?.message}</p>
      <label>Email</label>
      <input
        type="email"
        placeholder=""
        {...register("email", { required: true })}
      />
      <p>{errors.email?.message}</p>
      <label>Password</label>
      <input
        type="text"
        placeholder="password"
        {...register("password", { required: true })}
      />
      <p>{errors.password?.message}</p>
      <label>Confirm Password</label>
      <input
        type="text"
        placeholder="confirm password"
        {...register("confirmPassword", { required: true })}
      />
      <p>{errors.confirmPassword?.message}</p>
      <input type="submit" />
    </form>
  );
}
