import { object, string } from "yup";

export const signInSchema = object({
  email: string().email("Invalid email address").required("Required"),
  password: string().min(8, "Must be 8 symbols or more").required("Required"),
});

export const signUpSchema = object({
  email: string().email("Invalid email address").required("Required"),
  password: string().min(8, "Must be 8 symbols or more").required("Required"),
});
