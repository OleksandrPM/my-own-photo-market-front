"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "lib/forms/schemas";

export interface Values {
  email: string;
  password: string;
}

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <label>Email</label>
      <input
        type="email"
        placeholder="email"
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

      <input type="submit" />
    </form>
  );
}
