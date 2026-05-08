"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { SignUpFormInput, signUpSchema } from "@/lib/forms/schemas";
import ImageCropperModal from "@/components/ImageCropperModal";
import { buildFormData } from "@/lib/utils/buildFormData";
import { ImageMimeType } from "@/lib/utils/cropImage";
import { useRegisterMutation } from "@/lib/api/features/authApi";
import { extractApiMessage } from "@/lib/api/core/axiosBaseQuery/error-normalizers";

export default function SignUpForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [
    registerUser,
    {
      isLoading: isRegistering,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterMutation();

  const [preview, setPreview] = useState<string | null>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const inputIds = {
    avatar: "regAvatar",
    username: "regUsername",
    email: "regEmail",
    password: "regPassword",
  };

  const avatarName = "avatar";
  const avatarMime = ImageMimeType.WEBP;
  const avatarQuality = 0.7;

  const {
    register: formRegister,
    handleSubmit,
    watch,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<SignUpFormInput>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    // бажано, щоб avatar існував у form state відразу
    defaultValues: {
      avatar: null,
      username: "",
      email: "",
      password: "",
    } as any,
  });

  // ✅ ВАЖЛИВО: реєструємо кастомне поле, яке не прив’язане напряму через {...register()}
  useEffect(() => {
    formRegister("avatar" as any);
  }, [formRegister]);

  const avatar = watch("avatar");

  // preview для вже встановленого avatar (після кропу)
  useEffect(() => {
    if (avatar) {
      const url = URL.createObjectURL(avatar);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreview(null);
  }, [avatar]);

  // cleanup для imageSrc (яке створюється зі “сирого” файлу перед кропом)
  useEffect(() => {
    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc);
    };
  }, [imageSrc]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // якщо раніше вже був imageSrc — прибираємо його
    if (imageSrc) URL.revokeObjectURL(imageSrc);

    const url = URL.createObjectURL(file);
    setImageSrc(url);
    setIsCropModalOpen(true);

    // дає можливість вибрати той самий файл повторно
    e.target.value = "";
  };

  const handleApplyCropped = (file: File) => {
    setValue("avatar" as any, file, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setIsCropModalOpen(false);

    // cleanup imageSrc після застосування
    if (imageSrc) URL.revokeObjectURL(imageSrc);
    setImageSrc(null);
  };

  const handleCloseCropper = () => {
    setIsCropModalOpen(false);

    // cleanup imageSrc після закриття
    if (imageSrc) URL.revokeObjectURL(imageSrc);
    setImageSrc(null);
  };

  const handleClickAvatarButton = () => {
    if (avatar) {
      setValue("avatar" as any, null, {
        shouldValidate: true,
        shouldDirty: true,
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
    } else {
      fileInputRef.current?.click();
    }
  };

  const onSubmit = async (data: SignUpFormInput) => {
    // якщо треба форс-валідація перед submit
    const ok = await trigger();
    if (!ok) return;

    const formData = buildFormData(data);

    try {
      await registerUser(formData).unwrap();
      reset();
      router.push("/images");
    } catch (err) {
      console.error("Register failed:", err);
    }
  };

  return (
    <>
      {/* Cropping Modal */}
      <ImageCropperModal
        isOpen={isCropModalOpen}
        imageSrc={imageSrc}
        imageName={avatarName}
        mimeType={avatarMime}
        quality={avatarQuality}
        onApply={handleApplyCropped}
        onClose={handleCloseCropper}
      />

      {/* Main Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6 space-y-6"
      >
        {/* Avatar */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor={inputIds.avatar}
          >
            Avatar (optional)
          </label>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleClickAvatarButton}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              {preview ? "Remove avatar" : "Upload avatar"}
            </button>

            {preview && (
              <img
                src={preview}
                alt="Avatar preview"
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
          </div>

          <input
            id={inputIds.avatar}
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            className="hidden"
          />

          {errors.avatar && (
            <p className="text-red-600 text-sm mt-1">
              {String(errors.avatar.message)}
            </p>
          )}
        </div>

        {/* Username */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor={inputIds.username}
          >
            Username (optional)
          </label>
          <input
            id={inputIds.username}
            type="text"
            {...formRegister("username")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter username"
            autoComplete="username"
          />
          {errors.username && (
            <p className="text-red-600 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor={inputIds.email}
          >
            Email *
          </label>
          <input
            id={inputIds.email}
            type="email"
            {...formRegister("email")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="you@example.com"
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor={inputIds.password}
          >
            Password *
          </label>

          <div className="relative">
            <input
              id={inputIds.password}
              type={showPassword ? "text" : "password"}
              {...formRegister("password")}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter password"
              autoComplete="new-password"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isRegistering}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRegistering ? "Registering..." : "Register"}
        </button>

        {isRegisterError && (
          <p className="text-red-600 text-sm mt-2">
            {extractApiMessage(registerError) ?? "Registration failed"}
          </p>
        )}
      </form>
    </>
  );
}
