"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMeQuery } from "@/lib/api/features/authApi";
import { UserRole } from "@/types/user/user.types";

export default function AddNewPhotoBtn() {
  const { data: authResponse, isLoading, isError } = useMeQuery();
  const currentPath = usePathname();

  return !isError &&
    authResponse &&
    authResponse.user.role === UserRole.ADMIN &&
    currentPath !== "/images/add-new" ? (
    <div className="w-full flex justify-center sm:justify-end px-4 sm:px-0">
      <Link
        type="bottom"
        href="/images/add-new"
        className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium py-2 px-4 rounded-md transition-colors"
      >
        Add New Photo
      </Link>
    </div>
  ) : null;
}
