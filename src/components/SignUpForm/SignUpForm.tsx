"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "lib/forms/schemas";
import { SignUpFormInput } from "lib/forms/schemas/auth";
import ImageCropperModal from "components/ImageCropperModal";
import { useAppDispatch } from "lib/hooks/react-redux-hooks";
import { registerThunk } from "lib/redux/features/auth/authThunks";
import { buildFormData } from "lib/utils/buildFormData";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SignUpFormInput>({
    resolver: zodResolver(signUpSchema),
  });

  const avatar = watch("avatar");

  useEffect(() => {
    if (avatar) {
      const url = URL.createObjectURL(avatar);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreview(null);
  }, [avatar]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImageSrc(url);
    setIsCropModalOpen(true);
  };

  const handleApplyCropped = (file: File) => {
    setValue("avatar", file, { shouldValidate: true });
    setIsCropModalOpen(false);
  };

  const handleClickAvatarButton = () => {
    if (avatar) {
      setValue("avatar", null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } else {
      fileInputRef.current?.click();
    }
  };

  const onSubmit = async (data: SignUpFormInput) => {
    const formData = buildFormData(data);

    //  TODO: Handle errors and loading state
    const result = await dispatch(registerThunk(formData));

    if (registerThunk.fulfilled.match(result)) {
      reset();
      router.push("/images");
    }
  };

  return (
    <>
      {/* Cropping Modal */}
      <ImageCropperModal
        isOpen={isCropModalOpen}
        imageSrc={imageSrc}
        onApply={handleApplyCropped}
        onClose={() => setIsCropModalOpen(false)}
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
            {...register("username")}
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
            {...register("email")}
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
              {...register("password")}
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
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </>
  );
}
