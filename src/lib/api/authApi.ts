import { User } from "types/user";
import apiClient from "./apiClient";
import { SignInValues } from "lib/forms/schemas";

const resourcePath = "/auth";

export async function register(
  formData: FormData,
): Promise<{ user: User; accessToken: string }> {
  const response = await apiClient.post(`${resourcePath}/register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function login(
  signInData: SignInValues,
): Promise<{ user: User; accessToken: string }> {
  const response = await apiClient.post(`${resourcePath}/login`, signInData);

  return response.data;
}
