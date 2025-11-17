import { use } from "react";
import { object, string, ref } from "yup";

export const signInSchema = object({
  email: string().email("Invalid email address").required("Required"),
  password: string().min(8, "Must be 8 symbols or more").required("Required"),
});

export const signUpSchema = object({
  username: string()
    .min(3, "Must be 3 symbols or more")
    .max(20, "Must be 20 symbols or less")
    .required("Required"),
  email: string().email("Invalid email address").required("Required"),
  password: string().min(8, "Must be 8 symbols or more").required("Required"),
  confirmPassword: string()
    .oneOf([ref("password")], "Passwords must match")
    .required("Required"),
});
