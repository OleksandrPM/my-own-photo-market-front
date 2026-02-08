import { User } from "types/user";
import apiClient from "./apiClient";
import { SignUpValues } from "lib/forms/schemas";
import { SignInValues } from "components/SignInForm/SignInForm";

export async function register(
  signUpData: SignUpValues,
): Promise<User & { accessToken: string }> {
  const response = await apiClient.post("register", signUpData);

  return response.data;
}

export async function login(
  signInData: SignInValues,
): Promise<User & { accessToken: string }> {
  const response = await apiClient.post("login", signInData);

  return response.data;
}
