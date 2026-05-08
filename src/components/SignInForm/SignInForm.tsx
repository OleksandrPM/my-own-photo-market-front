"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { signInSchema, SignInValues } from "@/lib/forms/schemas";
import { SignInFormValues } from "@/lib/forms/schemas/auth/signIn.schema";
import { useLoginMutation } from "@/lib/api/features/authApi";
import {
  extractApiErrorBody,
  extractApiMessage,
  normalizeMessage,
} from "@/lib/api/core/axiosBaseQuery/error-normalizers";

export default function SignInForm() {
  const router = useRouter();

  const [loginUser, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignInFormValues>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormValues) => {
    clearErrors(["email", "password", "root.serverError"]);

    const payload: SignInValues = {
      email: data.email,
      password: data.password,
    };

    try {
      await loginUser(payload).unwrap();
      reset();
      router.push("/images");
    } catch (err) {
      const apiBody = extractApiErrorBody(err);

      if (apiBody?.fieldErrors) {
        (
          Object.entries(apiBody.fieldErrors) as Array<
            [keyof SignInValues, string | string[]]
          >
        ).forEach(([field, msg]) => {
          const text = normalizeMessage(msg) ?? "Invalid value";
          setError(
            field,
            { type: "server", message: text },
            { shouldFocus: true },
          );
        });
        return;
      }

      if (apiBody?.statusCode === 401) {
        setError(
          "password",
          { type: "server", message: "Invalid email or password" },
          { shouldFocus: true },
        );
        return;
      }

      const msg =
        normalizeMessage(apiBody?.message) ??
        extractApiMessage(err) ??
        "Login failed";
      setError("root.serverError", { type: "server", message: msg });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6 space-y-6"
    >
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="signInEmail"
        >
          Email
        </label>
        <input
          id="signInEmail"
          type="email"
          {...register("email")}
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-60"
          placeholder="you@example.com"
          autoComplete="email"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="signInPassword"
        >
          Password
        </label>

        <div className="relative">
          <input
            id="signInPassword"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            disabled={isLoading}
            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-60"
            placeholder="Enter password"
            autoComplete="current-password"
          />

          <button
            type="button"
            disabled={isLoading}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 enabled:hover:text-gray-700 disabled:cursor-not-allowed"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {errors.root?.serverError?.message && (
        <p className="text-red-600 text-sm">
          {errors.root.serverError.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg transition enabled:hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
