"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  InitialAdminValues,
  initialAdminSchema,
} from "@/lib/forms/schemas/setup";

import {
  useVerifyEmailMutation,
  useGetSetupStatusQuery,
  useCreateInitialAdminMutation,
} from "@/lib/api/features/setupApi";

type EmailVerifyState =
  | "idle"
  | "requesting"
  | "pending"
  | "verified"
  | "failed";

// Невеликий helper для читабельного повідомлення з RTK Query помилок
function getRtkErrorMessage(err: unknown): string | null {
  if (!err) return null;

  // RTK Query часто повертає { status, data } або SerializedError
  const anyErr = err as any;

  // fetchBaseQueryError
  if (anyErr?.data) {
    if (typeof anyErr.data === "string") return anyErr.data;
    if (typeof anyErr.data?.message === "string") return anyErr.data.message;
    if (Array.isArray(anyErr.data?.message))
      return anyErr.data.message.join(", ");
  }

  // SerializedError
  if (typeof anyErr?.message === "string") return anyErr.message;

  return "Unknown error";
}

export default function SetupForm() {
  const router = useRouter();

  // Form settings -----------------------------------------------------
  const inputIds = {
    email: "setupEmail",
    password: "setupPassword",
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    clearErrors,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<InitialAdminValues>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(initialAdminSchema),
    mode: "onChange",
  });

  const email = watch("email");
  const password = watch("password");

  const [showPassword, setShowPassword] = useState(false);
  // -------------------------------------------------------------------

  // Email verification state ------------------------------------------
  const [emailVerifyState, setEmailVerifyState] =
    useState<EmailVerifyState>("idle");
  const [verifyError, setVerifyError] = useState<string | null>(null);
  // -------------------------------------------------------------------

  // --- RTK Query hooks ---
  const [verifyEmail, { isLoading: isVerifyLoading }] =
    useVerifyEmailMutation();

  const [createInitialAdmin, { isLoading: isCreateLoading }] =
    useCreateInitialAdminMutation();

  // Poll status тільки коли pending
  const shouldPollStatus = emailVerifyState === "pending";

  // ✅ ВАЖЛИВО: хук useGetSetupStatusQuery викликаємо ТІЛЬКИ ОДИН РАЗ
  const {
    data: setupStatus,
    isFetching: isStatusFetching,
    error: setupStatusError,
  } = useGetSetupStatusQuery(undefined, {
    skip: !shouldPollStatus,
    pollingInterval: shouldPollStatus ? 30_000 : 0, // кожні 30 сек
    refetchOnMountOrArgChange: true,
  });

  const isBusy = isSubmitting || isVerifyLoading || isCreateLoading;

  // Визначення “email verified” з відповіді /status
  // ❗️Підстав точне поле з твого SetupStatusResponseDto.
  // Зараз зроблено максимально толерантно.
  const isEmailConfirmed = useMemo(() => {
    if (emailVerifyState === "verified") return true;
    if (!setupStatus) return false;

    const s = setupStatus as any;

    return (
      s?.emailVerified === true ||
      s?.isEmailVerified === true ||
      s?.status === "VERIFIED" ||
      s?.status === "EmailVerified" ||
      s?.setupStatus === "EMAIL_VERIFIED"
    );
  }, [setupStatus, emailVerifyState]);

  // Коли /status сказав “verified” — переводимо стейт і розблоковуємо пароль
  useEffect(() => {
    if (emailVerifyState === "pending" && isEmailConfirmed) {
      setEmailVerifyState("verified");
      setVerifyError(null);
    }
  }, [emailVerifyState, isEmailConfirmed]);

  // Якщо /status повернув помилку під час polling — показуємо failed
  useEffect(() => {
    if (emailVerifyState === "pending" && setupStatusError) {
      setEmailVerifyState("failed");
      setVerifyError(
        "Не вдалося перевірити статус верифікації. Спробуйте ще раз.",
      );
    }
  }, [emailVerifyState, setupStatusError]);

  // Якщо користувач змінив email — скидаємо верифікацію та пароль
  useEffect(() => {
    if (emailVerifyState !== "idle") {
      setEmailVerifyState("idle");
      setVerifyError(null);
      setValue("password", "");
      clearErrors("password");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  // UI логіка кнопок
  const canClickVerify = useMemo(() => {
    const hasEmail = !!email?.trim();
    const emailHasError = !!errors.email;

    return (
      hasEmail &&
      !emailHasError &&
      !isBusy &&
      emailVerifyState !== "requesting" &&
      emailVerifyState !== "pending" &&
      emailVerifyState !== "verified"
    );
  }, [email, errors.email, isBusy, emailVerifyState]);

  const isPasswordEnabled = isEmailConfirmed && !isBusy;

  const canSubmit = useMemo(() => {
    const hasPassword = !!password?.trim();
    const passwordHasError = !!errors.password;

    return isEmailConfirmed && hasPassword && !passwordHasError && !isBusy;
  }, [isEmailConfirmed, password, errors.password, isBusy]);

  const verifyButtonText = useMemo(() => {
    if (emailVerifyState === "requesting") return "Sending...";
    if (emailVerifyState === "pending")
      return isStatusFetching ? "Checking..." : "Waiting...";
    if (emailVerifyState === "verified") return "Email verified";
    if (emailVerifyState === "failed") return "Retry verification";
    return "Verify email";
  }, [emailVerifyState, isStatusFetching]);

  // Натиснули "Verify email"
  const onVerifyEmail = async () => {
    setVerifyError(null);

    const ok = await trigger("email");
    if (!ok) return;

    try {
      setEmailVerifyState("requesting");

      // Якщо твій endpoint очікує об’єкт — зміни на { email: email.trim() }
      await verifyEmail(email.trim()).unwrap();

      // переходимо в режим очікування підтвердження + polling /status
      setEmailVerifyState("pending");
    } catch (e: unknown) {
      setEmailVerifyState("failed");
      setVerifyError(
        getRtkErrorMessage(e) ??
          "Failed to start verification. Please try again.",
      );
    }
  };

  // Submit: create initial admin
  const onSubmit = async (data: InitialAdminValues) => {
    if (!isEmailConfirmed) return;

    try {
      await createInitialAdmin({
        email: data.email.trim(),
        password: data.password,
      }).unwrap();

      // reset після успіху
      setEmailVerifyState("idle");
      setVerifyError(null);
      reset({ email: "", password: "" });

      router.push("/user/signin");
    } catch (e: unknown) {
      console.error("Setup error:", e);
      setVerifyError(
        getRtkErrorMessage(e) ??
          "Не вдалося створити адміна. Спробуйте ще раз.",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6 space-y-6"
    >
      {/* Email */}
      <div className="space-y-2">
        <label
          className="block text-start text-sm font-medium text-gray-700"
          htmlFor={inputIds.email}
        >
          Email
        </label>

        <input
          id={inputIds.email}
          type="email"
          {...register("email")}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="you@example.com"
          autoComplete="email"
          disabled={
            isBusy ||
            emailVerifyState === "pending" ||
            emailVerifyState === "requesting"
          }
        />

        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email.message}</p>
        )}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onVerifyEmail}
            disabled={!canClickVerify}
            className={`px-4 py-2 rounded-lg transition text-white ${
              canClickVerify
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-indigo-300 cursor-not-allowed"
            }`}
          >
            {verifyButtonText}
          </button>

          {emailVerifyState === "pending" && (
            <span className="text-sm text-gray-600">
              Waiting for email confirmation...
            </span>
          )}

          {emailVerifyState === "verified" && (
            <span className="text-sm text-green-700 font-medium">
              ✓ Confirmed
            </span>
          )}
        </div>

        {verifyError && <p className="text-red-600 text-sm">{verifyError}</p>}
      </div>

      {/* Password + Submit показуємо тільки коли verified */}
      {emailVerifyState === "verified" && (
        <>
          <div className="space-y-2">
            <label
              className="block text-start text-sm font-medium text-gray-700"
              htmlFor={inputIds.password}
            >
              Password
            </label>

            <div className="relative">
              <input
                id={inputIds.password}
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  isPasswordEnabled
                    ? "border-gray-300"
                    : "border-gray-200 bg-gray-50"
                }`}
                placeholder={
                  isEmailConfirmed
                    ? "Enter password"
                    : "Verify email to set password"
                }
                autoComplete="current-password"
                disabled={!isPasswordEnabled}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                disabled={!isPasswordEnabled}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full py-2 rounded-lg transition text-white ${
              canSubmit
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            Register Admin
          </button>
        </>
      )}
    </form>
  );
}
